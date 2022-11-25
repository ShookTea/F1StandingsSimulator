import DriverStanding from './DriverStanding';
import { DataInput, Race } from '@/dataBuild/dataInputTypes';

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
            remainingRacesInSeason.length,
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

function calculateResults(input, races, remainingWins, maxRemainingPoints) {
    const dataResult = calculateResultAfterRaces(input, races);

    let result = [];

    dataResult.forEach((entry) => {
        result.push({
            driver: entry.driver,
            uuid: entry.uuid,
            temporary: entry.temporary,
            points: entry.points,
            maxPoints: entry.points + maxRemainingPoints,
            racePositions: entry.racePositions.racePositions,
            position: 0,
            maxPosition: 0,
            minPosition: 0,
        })
    })

    const sortedByPosition = sortByPositions(result, r => r.points);

    result = result.map(
        (entry) => {
            const driver = entry.driver;
            const sortedForBestCase = sortByPositions(result, r => r.driver === driver ? r.maxPoints : r.points);
            const sortedForWorstCase = sortByPositions(result, r => r.driver === driver ? r.points : r.maxPoints);

            entry.position = sortedByPosition.indexOf(driver) + 1;
            entry.maxPosition = sortedForBestCase.indexOf(driver) + 1;
            entry.minPosition = sortedForWorstCase.indexOf(driver) + 1;

            return entry;
        }
    );

    const sorted = result.sort((a, b) => a.position - b.position);

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
