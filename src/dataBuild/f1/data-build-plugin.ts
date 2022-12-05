import DriverStanding from './DriverStanding';
import { AbstractRace, DataInput, Race } from './dataInputTypes';
import { calculateMaxRemainingPoints as calculateMaxRemainingDriverPoints } from './DriverSimulationResult';
import DriverStandingSorter from './DriverStandingSorter';
import { Round, Season, Standing, StandingOwner } from '@/data/sim/f1/simDataTypes';
import { calculateMaxRemainingPoints as calculateMaxRemainingTeamPoints } from './TeamSimulationResult';
import { SorterBuilder } from './AbstractStandingSorter';
import TeamStandingSorter from './TeamStandingSorter';
import AbstractStandingResultStore from './AbstractStandingResultStore';
import AbstractStanding from './AbstractStanding';
import TeamStanding from './TeamStanding';

const fileRegex: RegExp = /sim\/f1\/([0-9]{4})\.data$/

export default {
    name: 'data-build',
    transform(src: string, id: string): string {
        if (!fileRegex.test(id)) {
            return;
        }
        const data: DataInput = JSON.parse(src);
        const converted: Season = convert(data)

        return 'export default ' + JSON.stringify(converted);
    }
};

function convert(input) {
    const { races, remainingRaces } = input;

    const result = [];

    for (let i = 0; i <= races.length; i++) {
        const racesPart = races.slice(0, i);
        const remainingRacesInSeason = races.slice(i).concat(remainingRaces)
        result.push(calculateResults(
            input,
            racesPart === undefined ? [] : racesPart,
            remainingRacesInSeason,
        ));
    }

    return result;
}

function calculateResults(input: DataInput, races: Race[], remainingRaces: AbstractRace[]): Round
{
    const roundName: string = races.length === 0 ? 'Start of season' : 'After ' + races[races.length - 1].label;
    const driverStandings: DriverStanding[] = calculateStandingsAfterRace(
        input, races, i => DriverStanding.createEmptyStandings(i, races),
    );
    const teamStandings: TeamStanding[] = calculateStandingsAfterRace(
        input, races, i => TeamStanding.createEmptyStandings(i, races),
    );

    return {
        roundName,
        driverStandings: calculateResultsForStandings(driverStandings, remainingRaces, input, DriverStandingSorter.getBuilder()),
        teamStandings: calculateResultsForStandings(teamStandings, remainingRaces, input, TeamStandingSorter.getBuilder()),
        maxRemainingDriverPoints: calculateMaxRemainingDriverPoints(remainingRaces, input),
        maxRemainingTeamPoints: calculateMaxRemainingTeamPoints(remainingRaces, input),
    }
}

function calculateResultsForStandings<S extends StandingOwner>(
    standingResult: AbstractStanding<S>[],
    remainingRaces: AbstractRace[],
    input: DataInput,
    sorterBuilder: SorterBuilder<AbstractStandingResultStore<S>>
): Standing<S>[] {
    const dataResult = standingResult.map(s => s.toStandingResult(remainingRaces, input));
    const comparator = sorterBuilder.buildSorter();

    dataResult
        .sort((a, b) => comparator.compare(a, b))
        .forEach((standing, index) => standing.position = index + 1);

    dataResult.forEach(d => d.calculatePossiblePositions(dataResult, sorterBuilder));

    return dataResult.map(s => s.convertToResultObject());
}

function calculateStandingsAfterRace<T extends AbstractStanding<any>>(
    input: DataInput,
    races: Race[],
    emptyStandingsBuilder: (input: DataInput) => T[],
): T[] {
    const standings: T[] = emptyStandingsBuilder(input);

    for (const race of races) {
        standings.forEach(entry => entry.addRaceResult(input, race));
    }

    return standings;
}

