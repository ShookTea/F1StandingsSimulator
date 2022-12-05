import { Team } from '@/data/sim/f1/simDataTypes';
import { AbstractRace, DataInput } from './dataInputTypes';
import AbstractStandingResultStore from './AbstractStandingResultStore';
import TeamStanding from './TeamStanding';

export default class TeamSimulationResult extends AbstractStandingResultStore<Team> {
    constructor(teamStanding: TeamStanding, remainingRaces: AbstractRace[], input: DataInput)
    {
        super(teamStanding, remainingRaces, input, calculateMaxRemainingPoints(remainingRaces, input));
    }
}

export function calculateMaxRemainingPoints(remainingRaces: AbstractRace[], input: DataInput): number
{
    return remainingRaces.map(r => {
        const pointSchema = input.pointSchemas[r.typeBeforeRace ?? r.type];
        let points = (pointSchema.points[0] ?? 0) + (pointSchema.points[1] ?? 0);
        if (pointSchema.fastestLap !== undefined) {
            points += pointSchema.fastestLap.value;
        }
        return points;
    }).reduce((a, b) => a + b, 0);
}