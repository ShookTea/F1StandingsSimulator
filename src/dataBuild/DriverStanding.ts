import { DataInput, Race } from './dataInputTypes';
import PointSchema from './PointSchema';

export default class DriverStanding {
    readonly driver: string;
    readonly uuid: string;
    readonly temporary: boolean;
    points: number = 0;
    racePositions: RacePositionMap = {};

    constructor(driver: string, uuid: string, temporary: boolean)
    {
        this.driver = driver;
        this.uuid = uuid;
        this.temporary = temporary;
    }

    addRaceResult(input: DataInput, race: Race): void
    {
        const index: number = race.positions.indexOf(this.driver);
        if (index === -1) {
            return;
        }
        const pointSchema: PointSchema = new PointSchema(input.pointSchemas[race.type]);
        const position: number = index + 1;

        this.points += pointSchema.getPointsForPosition(position, this.driver === race.fastestLap);
        if (pointSchema.positionsCount) {
            if (!this.racePositions.hasOwnProperty(position)) {
                this.racePositions[position] = 0;
            }
            this.racePositions[position]++;
        }

        if (position <= pointSchema.fastestLap.maxPosition && this.driver === race.fastestLap) {
            this.points += pointSchema.fastestLap.value;
        }
    }

    static createEmptyStandings(input: DataInput): DriverStanding[]
    {
        const drivers: string[] = Object.keys(input.drivers)
        const standings: DriverStanding[] = [];
        for (const driver of drivers) {
            standings.push(
                new DriverStanding(driver, input.drivers[driver].uuid, input.drivers[driver].temporary ?? false)
            );
        }

        return standings;
    }
}