import { Standing, Team } from '@/data/sim/f1/simDataTypes';
import DriverStanding from '@/dataBuild/DriverStanding';
import RacePositionMapping from './RacePositionMapping';
import { AbstractRace, DataInput } from '@/dataBuild/dataInputTypes';

export default class TeamStanding {
    readonly team: Team;
    readonly points: number;
    readonly racePositions: RacePositionMapping;
    readonly maxPoints: number;
    readonly remainingCountingRaces: number;

    constructor(drivers: DriverStanding[], remainingRaces: AbstractRace[], input: DataInput)
    {
        const maxRemainingPoints = remainingRaces.map(r => {
            const pointSchema = input.pointSchemas[r.type];
            let points = (pointSchema.points[0] ?? 0) + (pointSchema.points[1] ?? 0);
            if (pointSchema.fastestLap !== undefined) {
                points += pointSchema.fastestLap.value;
            }
            return points;
        }).reduce((a, b) => a + b, 0);

        this.remainingCountingRaces = remainingRaces
            .filter(r => input.pointSchemas[r.type].positionsCount)
            .length;
        this.team = drivers[0].driver.team;
        this.points = drivers.map(d => d.points).reduce((a, b) => a + b, 0);
        this.maxPoints = this.points + maxRemainingPoints;
        this.racePositions = drivers.map(d => d.racePositions).reduce((a, b) => a.add(b), new RacePositionMapping());
    }

    convertToResultObject(): Standing<Team>
    {
        return {
            owner: this.team,
            points: this.points,
            maxPoints: this.maxPoints,
            position: 0,
            minPosition: 0,
            maxPosition: 0,
            racePositions: this.racePositions.racePositions,
        };
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
