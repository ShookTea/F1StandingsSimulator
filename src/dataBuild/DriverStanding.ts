export default class DriverStanding {
    driver: Driver;
    uuid: string;
    temporary: boolean;
    points: number = 0;
    racePositions: RacePositionMap = {};

    constructor(driver: string, uuid: string, temporary: boolean) {
        this.driver = driver;
        this.uuid = uuid;
        this.temporary = temporary;
    }

    addRaceResult(input: DataInput, race: Race): void {
        const index: number = race.positions.indexOf(this.driver);
        if (index === -1) {
            return;
        }
        const pointSchema: PointSchema = input.pointSchemas[race.type];
        const position: number = index + 1;

        this.points += pointSchema.points[index] ?? 0;
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
}