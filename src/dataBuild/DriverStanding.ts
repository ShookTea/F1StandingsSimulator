import { AbstractRace, DataInput, DriverEntry, Race, TeamEntry } from './dataInputTypes';
import PointSchema from './PointSchema';
import { Driver, Team } from '@/data/sim/f1/simDataTypes';
import drivers from '../data/racing_drivers.json';
import AbstractStanding from './AbstractStanding';
import DriverSimulationResult from './DriverSimulationResult';
import AbstractStandingResultStore from '@/dataBuild/AbstractStandingResultStore';

export default class DriverStanding extends AbstractStanding<Driver> {
    constructor(driverAbbr: string, input: DataInput)
    {
        const entry: DriverEntry = input.drivers[driverAbbr];
        const teamName: string = entry.team;
        const teamEntry: TeamEntry = input.teams[entry.team];
        const team: Team = {
            entry: teamName,
            ...teamEntry,
        };

        const driver: Driver = {
            abbreviation: driverAbbr,
            uuid: entry.uuid,
            temporary: entry.temporary,
            number: entry.number,
            team: team,
            details: drivers[entry.uuid],
        };
        super(driver);
    }

    addRaceResult(input: DataInput, race: Race): void
    {
        const index: number = race.positions.indexOf(this.owner.abbreviation);
        if (index === -1) {
            return;
        }
        const pointSchema: PointSchema = new PointSchema(input.pointSchemas[race.type]);
        const position: number = index + 1;

        this.points += pointSchema.getPointsForPosition(position, this.owner.abbreviation === race.fastestLap);
        this.racePositions.registerPosition(position, pointSchema);
    }

    static createEmptyStandings(input: DataInput): DriverStanding[]
    {
        const drivers: string[] = Object.keys(input.drivers)
        const standings: DriverStanding[] = [];
        for (const driver of drivers) {
            standings.push(
                new DriverStanding(driver, input),
            );
        }

        return standings;
    }

    toStandingResult(remainingRaces: AbstractRace[], input: DataInput): AbstractStandingResultStore<Driver>
    {
        return new DriverSimulationResult(this, remainingRaces, input);
    }
}