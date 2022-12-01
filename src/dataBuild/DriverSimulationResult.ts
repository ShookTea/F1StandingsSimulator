import DriverStanding from './DriverStanding';
import { Driver } from '@/data/sim/f1/simDataTypes';
import { AbstractRace, DataInput } from '@/dataBuild/dataInputTypes';
import AbstractStandingResultStore from './AbstractStandingResultStore';

export default class DriverSimulationResult extends AbstractStandingResultStore<Driver> {
    constructor(standing: DriverStanding, remainingRaces: AbstractRace[], input: DataInput)
    {
        super(standing, remainingRaces, input, calculateMaxRemainingPoints(remainingRaces, input));
    }

    isTemporaryAndNotRacedYet(): boolean
    {
        if (!this.owner.temporary) {
            return false;
        }

        return !this.racePositions.hasRaced();
    }
}

export function calculateMaxRemainingPoints(remainingRaces: AbstractRace[], input: DataInput): number
{
    return remainingRaces.map(r => {
        const pointSchema = input.pointSchemas[r.typeBeforeRace ?? r.type];
        let points = pointSchema.points[0];
        if (pointSchema.fastestLap !== undefined) {
            points += pointSchema.fastestLap.value;
        }
        return points;
    }).reduce((a, b) => a + b, 0);
}