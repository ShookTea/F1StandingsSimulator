import { DataInput, DriverEntry, Race } from './dataInputTypes';
import PointSchema from './PointSchema';
import RacePositionMapping from './RacePositionMapping';
import { Driver } from '@/data/sim/f1/simDataTypes';
import drivers from '../data/racing_drivers.json';

export default class DriverStanding {
    readonly driver: Driver
    readonly uuid: string;
    readonly temporary: boolean;
    points: number = 0;
    racePositions: RacePositionMapping;

    constructor(driverAbbr: string, entry: DriverEntry)
    {
        this.uuid = entry.uuid;
        this.temporary = entry.temporary;
        this.driver = {
            abbreviation: driverAbbr,
            uuid: entry.uuid,
            temporary: entry.temporary,
            number: entry.number,
            team: entry.team,
            details: drivers[entry.uuid],
        };
        this.racePositions = new RacePositionMapping();
    }

    addRaceResult(input: DataInput, race: Race): void
    {
        const index: number = race.positions.indexOf(this.driver.abbreviation);
        if (index === -1) {
            return;
        }
        const pointSchema: PointSchema = new PointSchema(input.pointSchemas[race.type]);
        const position: number = index + 1;

        this.points += pointSchema.getPointsForPosition(position, this.driver.abbreviation === race.fastestLap);
        this.racePositions.registerPosition(position, pointSchema);
    }

    static createEmptyStandings(input: DataInput): DriverStanding[]
    {
        const drivers: string[] = Object.keys(input.drivers)
        const standings: DriverStanding[] = [];
        for (const driver of drivers) {
            standings.push(
                new DriverStanding(driver, input.drivers[driver])
            );
        }

        return standings;
    }
}