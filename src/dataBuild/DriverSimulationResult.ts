import DriverStanding from './DriverStanding';
import DriverStandingSorter from './DriverStandingSorter';
import { Standing } from '@/data/sim/simDataTypes';

export default class DriverSimulationResult {
    readonly standing: DriverStanding;
    readonly maxPoints: number;
    readonly remainingCountingRaces: number;

    position: number = 0;
    maxPosition: number = 0;
    minPosition: number = 0;

    constructor(standing: DriverStanding, maxRemainingPoints: number, remainingCountingRaces: number)
    {
        this.standing = standing;
        this.maxPoints = standing.points + maxRemainingPoints;
        this.remainingCountingRaces = remainingCountingRaces;
    }

    convertToResultObject(): Standing
    {
        return {
            driver: this.standing.driver,
            uuid: this.standing.uuid,
            temporary: this.standing.temporary,
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