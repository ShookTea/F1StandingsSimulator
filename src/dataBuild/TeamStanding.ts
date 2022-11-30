import { Team } from '@/data/sim/f1/simDataTypes';
import DriverStanding from '@/dataBuild/DriverStanding';
import RacePositionMapping from './RacePositionMapping';
import { AbstractRace, DataInput } from '@/dataBuild/dataInputTypes';
import AbstractStandingResultStore from './AbstractStandingResultStore';

export default class TeamStanding extends AbstractStandingResultStore<Team> {
    constructor(drivers: DriverStanding[], remainingRaces: AbstractRace[], input: DataInput)
    {
        super(drivers[0].driver.team);

        this.remainingCountingRaces = remainingRaces
            .filter(r => input.pointSchemas[r.type].positionsCount)
            .length;
        this.points = drivers.map(d => d.points).reduce((a, b) => a + b, 0);
        this.maxPoints = this.points + calculateMaxRemainingPoints(remainingRaces, input);
        this.racePositions = drivers.map(d => d.racePositions).reduce((a, b) => a.add(b), new RacePositionMapping());
    }

    static buildFromDrivers(drivers: DriverStanding[], remainingRaces: AbstractRace[], input: DataInput): TeamStanding[]
    {
        return Array.from(groupBy(drivers, d => d.driver.team.uuid)
            .values())
            .map(ds => new TeamStanding(ds, remainingRaces, input));
    }
}

export function groupBy<K, V>(list: V[], keyGetter: (input: V) => K): Map<K, V[]> {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

export function calculateMaxRemainingPoints(remainingRaces: AbstractRace[], input: DataInput): number
{
    return remainingRaces.map(r => {
        const pointSchema = input.pointSchemas[r.type];
        let points = (pointSchema.points[0] ?? 0) + (pointSchema.points[1] ?? 0);
        if (pointSchema.fastestLap !== undefined) {
            points += pointSchema.fastestLap.value;
        }
        return points;
    }).reduce((a, b) => a + b, 0);
}