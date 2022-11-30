import DriverStanding from './DriverStanding';
import DriverStandingSorter from './DriverStandingSorter';
import { Driver } from '@/data/sim/f1/simDataTypes';
import { AbstractRace, DataInput } from '@/dataBuild/dataInputTypes';
import AbstractStandingResultStore from './AbstractStandingResultStore';

export default class DriverSimulationResult extends AbstractStandingResultStore<Driver> {
    constructor(standing: DriverStanding, remainingRaces: AbstractRace[], input: DataInput) {
        super(standing.driver);

        const maxRemainingPoints = remainingRaces.map(r => {
            const pointSchema = input.pointSchemas[r.type];
            let points = pointSchema.points[0];
            if (pointSchema.fastestLap !== undefined) {
                points += pointSchema.fastestLap.value;
            }
            return points;
        }).reduce((a, b) => a + b, 0);

        this.points = standing.points;
        this.maxPoints = standing.points + maxRemainingPoints;
        this.racePositions = standing.racePositions;

        this.remainingCountingRaces = remainingRaces
            .filter(r => input.pointSchemas[r.type].positionsCount)
            .length;
    }

    isTemporaryAndNotRacedYet(): boolean
    {
        if (!this.owner.temporary) {
            return false;
        }

        return !this.racePositions.hasRaced();
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