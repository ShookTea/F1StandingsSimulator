import DriverStanding from './DriverStanding';
import DriverStandingSorter from './DriverStandingSorter';
import { Driver, Standing } from '@/data/sim/f1/simDataTypes';
import { AbstractRace, DataInput } from '@/dataBuild/dataInputTypes';

export default class DriverSimulationResult {
    readonly standing: DriverStanding;
    readonly driver: Driver;
    readonly maxPoints: number;
    readonly remainingCountingRaces: number;

    position: number = 0;
    maxPosition: number = 0;
    minPosition: number = 0;

    constructor(standing: DriverStanding, remainingRaces: AbstractRace[], input: DataInput) {
        const maxRemainingPoints = remainingRaces.map(r => {
            const pointSchema = input.pointSchemas[r.type];
            let points = pointSchema.points[0];
            if (pointSchema.fastestLap !== undefined) {
                points += pointSchema.fastestLap.value;
            }
            return points;
        }).reduce((a, b) => a + b, 0);

        this.standing = standing;
        this.driver = standing.driver;
        this.maxPoints = standing.points + maxRemainingPoints;

        this.remainingCountingRaces = remainingRaces
            .filter(r => input.pointSchemas[r.type].positionsCount)
            .length;
    }

    isTemporaryAndNotRacedYet(): boolean
    {
        if (!this.driver.temporary) {
            return false;
        }

        return !this.standing.racePositions.hasRaced();
    }

    convertToResultObject(): Standing<Driver>
    {
        return {
            owner: this.driver,
            points: this.standing.points,
            maxPoints: this.maxPoints,
            position: this.position,
            maxPosition: this.maxPosition,
            minPosition: this.minPosition,
            racePositions: this.standing.racePositions.racePositions,
        };
    }

    calculatePossiblePositions(allResults: DriverSimulationResult[]): void
    {
        const bestCaseSorter = DriverStandingSorter.buildBestResultSorter(this);
        const worstCaseSorter = DriverStandingSorter.buildWorstResultSorter(this);

        this.maxPosition = [...allResults]
            .sort((a, b) => bestCaseSorter.compare(a, b))
            .indexOf(this) + 1;
        this.minPosition = [...allResults]
            .sort((a, b) => worstCaseSorter.compare(a, b))
            .indexOf(this) + 1;
    }
}