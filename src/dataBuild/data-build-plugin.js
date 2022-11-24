const fileRegex = /([0-9]{4})\.data$/

export default {
    name: 'data-build',
    transform(src, id) {
        if (!fileRegex.test(id)) {
            return;
        }
        const data = JSON.parse(src);
        const year = fileRegex.exec(id)[1]
        const converted = convert(data, year)

        return 'export default ' + JSON.stringify(converted);
    }
};

function convert(input, year) {
    const { races, pointSchemas, remainingRaces } = input;

    const result = [];

    for (let i = 0; i <= races.length; i++) {
        const racesPart = races.slice(0, i);
        const remainingRacesInSeason = races.slice(i).concat(remainingRaces)
        const maxPoints = calculateMaxAvailablePoints(remainingRacesInSeason, pointSchemas)
        result.push(calculateResults(
            year,
            input,
            racesPart === undefined ? [] : racesPart,
            remainingRacesInSeason.length,
            maxPoints,
            remainingRacesInSeason.length > 0 ? remainingRacesInSeason[0] : null,
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

function calculateResults(year, input, races, remainingWins, maxRemainingPoints, nextRound) {
    const dataResult = calculateResultAfterRaces(year, input, races);

    let result = [];

    Object.keys(dataResult).forEach((driver) => {
        result.push({
            driver,
            uuid: dataResult[driver].uuid,
            temporary: dataResult[driver].temporary,
            points: dataResult[driver].points,
            maxPoints: dataResult[driver].points + maxRemainingPoints,
            racePositions: dataResult[driver].positionsCount,
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

    const roundName = nextRound === null ? 'End of season' : 'Before ' + nextRound.label;

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

function calculateResultAfterRaces(year, input, races) {
    const result = prepareEmptyResults(input);

    for (const { type, fastestLap, positions, code } of races) {
        const pointSchema = input.pointSchemas[type];

        for (let i = 0; i < positions.length; i++) {
            const driver = positions[i];
            const position = i + 1;

            if (!result.hasOwnProperty(driver)) {
                throw new Error(`Non-existing driver ${driver} in race code ${code} [${type}], year ${year}`)
            }

            result[driver].points += pointSchema.points[position - 1] ?? 0;

            if (pointSchema.positionsCount) {
                if (!result[driver].positionsCount.hasOwnProperty(position)) {
                    result[driver].positionsCount[position] = 0;
                }
                result[driver].positionsCount[position]++;
            }

            if (position <= pointSchema.fastestLap.maxPosition && driver === fastestLap) {
                result[driver].points += pointSchema.fastestLap.value;
            }
        }
    }

    return result;
}

function prepareEmptyResults(input) {
    const drivers = Object.keys(input.drivers)
    const result = {};
    for (const driver of drivers) {
        result[driver] = {
            points: 0,
            positionsCount: {},
            uuid: input.drivers[driver].uuid,
            temporary: input.drivers[driver].temporary ?? false,
        }
    }

    return result;
}