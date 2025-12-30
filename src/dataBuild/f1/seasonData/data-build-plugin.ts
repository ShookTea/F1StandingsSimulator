import DriverStanding from '../DriverStanding';
import { AbstractRace, DataInput, Race } from '../dataInputTypes';
import { calculateMaxRemainingPoints as calculateMaxRemainingDriverPoints } from '../DriverSimulationResult';
import DriverStandingSorter from '../DriverStandingSorter';
import { Round, Standing, StandingOwner, Driver } from '@/data/sim/f1/simDataTypes';
import { calculateMaxRemainingPoints as calculateMaxRemainingTeamPoints } from '../TeamSimulationResult';
import { SorterBuilder } from '../AbstractStandingSorter';
import TeamStandingSorter from '../TeamStandingSorter';
import AbstractStandingResultStore from '../AbstractStandingResultStore';
import AbstractStanding from '../AbstractStanding';
import TeamStanding from '../TeamStanding';

export function convert(input) {
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
    
    const calculatedDriverStandings = calculateResultsForStandings(driverStandings, remainingRaces, input, DriverStandingSorter.getBuilder());
    
    generateHeadToHeads(input, calculatedDriverStandings);

    return {
        roundName,
        driverStandings: calculatedDriverStandings,
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

    comparator.resetSorter(dataResult);
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

function generateHeadToHeads(
    input: DataInput,
    calculatedStandings: Standing<Driver>[]
) {
    const headToHeadSituations = [
        ...gatherHeadToHeadSituations(calculatedStandings, 2),
        ...gatherHeadToHeadSituations(calculatedStandings, 3),
    ];
}

type HeadToHeadSituation = {
    standings: Standing<Driver>[];
    position: number;
}

function gatherHeadToHeadSituations(
    standings: Standing<Driver>[],
    driversCountInSituation: number
): HeadToHeadSituation[] {
    const result: HeadToHeadSituation[] = [];
    for (let i = 0; i <= standings.length - driversCountInSituation; i++) {
        const expectedBestPosition = i + 1;
        const expectedWorstPosition = i + driversCountInSituation;
        const slice = standings.slice(i, i + driversCountInSituation);
        const validSituation = slice.every(
            (standing) => standing.maxPosition === expectedBestPosition && standing.minPosition === expectedWorstPosition
        );
        if (validSituation) {
            result.push({
                standings: slice,
                position: expectedBestPosition,
            });
        }
    }

    return result;
}

function kPermutations<T>(arr: T[], k: number): T[][] {
    const result: T[][] = [];
    const used: boolean[] = new Array(arr.length).fill(false);
    const curr: T[] = [];

    function backtrack(): void {
        if (curr.length === k) {
            result.push(curr.slice());
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            curr.push(arr[i]);
            backtrack();
            curr.pop();
            used[i] = false;
        }
    }

    if (k <= 0 || k > arr.length) {
        return [];
    }
    backtrack();
    return result;
}