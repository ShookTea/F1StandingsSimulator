import DriverStanding from './DriverStanding';
import { AbstractRace, DataInput, Race } from './/dataInputTypes';
import DriverSimulationResult from './DriverSimulationResult';
import DriverStandingSorter from './DriverStandingSorter';

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

    const finalOrder = result[result.length - 1].standings.map(s => s.driver);

    result.map(entry => sortByFinalOrder(entry, finalOrder));

    return result;
}

function sortByFinalOrder(entry, finalOrder) {
    const standings = entry.standings;
    standings.sort((a, b) => finalOrder.indexOf(a.driver) - finalOrder.indexOf(b.driver));
    entry.standings = standings;

    return entry;
}

function calculateMaxAvailablePoints(remainingRacesInSeason, pointSchemas) {
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

function calculateResults(input: DataInput, races: Race[], remainingRaces: AbstractRace[], maxRemainingPoints: number)
{
    const dataResult = calculateResultAfterRaces(input, races);

    const remainingCountingRaces: number = remainingRaces
        .filter(race => input.pointSchemas[race.type].positionsCount)
        .length;

    const driverSimulationResults: DriverSimulationResult[] = dataResult
        .map(result => new DriverSimulationResult(result, maxRemainingPoints, remainingCountingRaces));

    const comparator = DriverStandingSorter.buildSorter();
    driverSimulationResults
        .sort((a, b) => comparator.compare(a, b))
        .forEach((standing, index) => standing.position = index + 1);

    driverSimulationResults.forEach(d => d.calculatePossiblePositions(driverSimulationResults));

    const sorted: Standing[] = driverSimulationResults.map(d => d.convertToResultObject());

    const roundName = races.length === 0 ? 'Start of season' : 'After ' + races[races.length - 1].label;

    return {
        standings: sorted,
        roundName,
    }
}

function sortByPositions(results, pointsSupplier) {
    return [...results]
        .sort(buildComparator(pointsSupplier))
        .map(entry => entry.driver)
}

function buildComparator(pointsSupplier) {
    return (a, b) => {
        const aPoints = pointsSupplier(a);
        const bPoints = pointsSupplier(b);
        if (aPoints !== bPoints) {
            return bPoints - aPoints;
        }

        for (let i = 1; i < 50; i++) {
            const aPosition = a.racePositions[i] ?? 0;
            const bPosition = b.racePositions[i] ?? 0;
            if (aPosition !== bPosition) {
                return bPosition - aPosition;
            }
        }

        return 0;
    }
}

function calculateResultAfterRaces(input: DataInput, races: Race[]): DriverStanding[] {
    const standings = DriverStanding.createEmptyStandings(input)

    for (const race of races) {
        standings.forEach(entry => entry.addRaceResult(input, race));
    }

    return standings;
}
