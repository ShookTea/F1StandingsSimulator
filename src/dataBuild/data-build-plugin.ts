import DriverStanding from './DriverStanding';
import { AbstractRace, DataInput, PointSchema, Race } from './dataInputTypes';
import DriverSimulationResult from './DriverSimulationResult';
import DriverStandingSorter from './DriverStandingSorter';
import { Round, Season } from '@/data/sim/f1/simDataTypes';

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
    const { races, pointSchemas, remainingRaces } = input;

    const result = [];

    for (let i = 0; i <= races.length; i++) {
        const racesPart = races.slice(0, i);
        const remainingRacesInSeason = races.slice(i).concat(remainingRaces)
        const maxPoints = calculateMaxAvailablePoints(remainingRacesInSeason, pointSchemas)
        result.push(calculateResults(
            input,
            racesPart === undefined ? [] : racesPart,
            remainingRacesInSeason,
            maxPoints,
        ));
    }

    return result;
}

function calculateMaxAvailablePoints(remainingRacesInSeason: AbstractRace[], pointSchemas: PointSchema[]): number
{
    let maxPoints = 0
    for (const { type } of remainingRacesInSeason) {
        const { points, fastestLap } = pointSchemas[type];
        maxPoints += points[0];
        if (fastestLap !== undefined) {
            maxPoints += fastestLap.value;
        }
    }

    return maxPoints;
}

function calculateResults(input: DataInput, races: Race[], remainingRaces: AbstractRace[], maxRemainingPoints: number): Round
{
    const roundName: string = races.length === 0 ? 'Start of season' : 'After ' + races[races.length - 1].label;
    const dataResult: DriverStanding[] = calculateResultAfterRaces(input, races);

    const remainingCountingRaces: number = remainingRaces
        .filter(race => input.pointSchemas[race.type].positionsCount)
        .length;

    const driverSimulationResults: DriverSimulationResult[] = dataResult
        .map(result => new DriverSimulationResult(result, maxRemainingPoints, remainingCountingRaces));

    const comparator: DriverStandingSorter = DriverStandingSorter.buildSorter();

    driverSimulationResults
        .sort((a, b) => comparator.compare(a, b))
        .forEach((standing, index) => standing.position = index + 1);

    driverSimulationResults.forEach(d => d.calculatePossiblePositions(driverSimulationResults));

    return {
        standings: driverSimulationResults.map(d => d.convertToResultObject()),
        roundName,
    }
}

function calculateResultAfterRaces(input: DataInput, races: Race[]): DriverStanding[] {
    const standings = DriverStanding.createEmptyStandings(input)

    for (const race of races) {
        standings.forEach(entry => entry.addRaceResult(input, race));
    }

    return standings;
}
