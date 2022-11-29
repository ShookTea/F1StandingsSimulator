import DriverStanding from './DriverStanding';
import DriverStandingSorter from './DriverStandingSorter';
import { Driver, Standing } from '@/data/sim/f1/simDataTypes';

export default class DriverSimulationResult {
    readonly standing: DriverStanding;
    readonly driver: Driver;
    readonly maxPoints: number;
    readonly remainingCountingRaces: number;

    position: number = 0;
    maxPosition: number = 0;
    minPosition: number = 0;

    constructor(standing: DriverStanding, maxRemainingPoints: number, remainingCountingRaces: number)
    {
        this.standing = standing;
        this.driver = standing.driver2;
        this.maxPoints = standing.points + maxRemainingPoints;
        this.remainingCountingRaces = remainingCountingRaces;
    }

    isTemporaryAndNotRacedYet(): boolean
    {
        if (!this.driver.temporary) {
            return false;
        }

        return !this.standing.racePositions.hasRaced();
    }

    convertToResultObject(): Standing
    {
        return {
            driver: this.driver,
            abbreviation: this.driver.abbreviation,
            uuid: this.driver.uuid,
            temporary: this.driver.temporary,
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