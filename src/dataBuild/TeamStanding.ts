import { Standing, Team } from '@/data/sim/f1/simDataTypes';
import DriverStanding from '@/dataBuild/DriverStanding';
import RacePositionMapping from './RacePositionMapping';

export default class TeamStanding {
    readonly team: Team;
    readonly points: number;
    readonly racePositions: RacePositionMapping;

    constructor(drivers: DriverStanding[])
    {
        this.team = drivers[0].driver.team;
        this.points = drivers.map(d => d.points).reduce((a, b) => a + b, 0);
        this.racePositions = drivers.map(d => d.racePositions).reduce((a, b) => a.add(b), new RacePositionMapping());
    }

    convertToResultObject(): Standing<Team>
    {
        return {
            owner: this.team,
            points: this.points,
            maxPoints: this.points,
            position: 0,
            minPosition: 0,
            maxPosition: 0,
            racePositions: this.racePositions.racePositions,
        };
    }

    static buildFromDrivers(drivers: DriverStanding[]): TeamStanding[]
    {
        return Array.from(groupBy(drivers, d => d.driver.team.uuid)
            .values())
            .map(ds => new TeamStanding(ds));
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
