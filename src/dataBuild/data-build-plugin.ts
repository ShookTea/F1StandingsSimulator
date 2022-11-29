import DriverStanding from './DriverStanding';
import { AbstractRace, DataInput, Race } from './dataInputTypes';
import DriverSimulationResult from './DriverSimulationResult';
import DriverStandingSorter from './DriverStandingSorter';
import { Driver, Round, Season, Standing, Team } from '@/data/sim/f1/simDataTypes';
import TeamStanding from '../dataBuild/TeamStanding';
import data from '@/data/sim/data';

const fileRegex: RegExp = /([0-9]{4})\.data$/

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
    const dataResult: DriverStanding[] = calculateResultAfterRaces(input, races);

    return {
        driverStandings: calculateDriverResults(dataResult, remainingRaces, input),
        teamStandings: calculateTeamResults(dataResult, remainingRaces, input),
        roundName,
    }
}

function calculateTeamResults(dataResult: DriverStanding[], remainingRaces: AbstractRace[], input: DataInput): Standing<Team>[]
{
    const teamStandings: TeamStanding[] = TeamStanding.buildFromDrivers(dataResult, remainingRaces, input);

    return teamStandings.map(t => t.convertToResultObject());
}

function calculateDriverResults(dataResult: DriverStanding[], remainingRaces: AbstractRace[], input: DataInput): Standing<Driver>[]
{
    const driverSimulationResults: DriverSimulationResult[] = dataResult
        .map(result => new DriverSimulationResult(result, remainingRaces, input));

    const comparator: DriverStandingSorter = DriverStandingSorter.buildSorter();

    driverSimulationResults
        .sort((a, b) => comparator.compare(a, b))
        .forEach((standing, index) => standing.position = index + 1);

    driverSimulationResults.forEach(d => d.calculatePossiblePositions(driverSimulationResults));

    return driverSimulationResults.map(d => d.convertToResultObject());
}

function calculateResultAfterRaces(input: DataInput, races: Race[]): DriverStanding[] {
    const standings = DriverStanding.createEmptyStandings(input)

    for (const race of races) {
        standings.forEach(entry => entry.addRaceResult(input, race));
    }

    return standings;
}
