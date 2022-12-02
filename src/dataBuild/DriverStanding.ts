import { AbstractRace, DataInput, DriverEntry, Race, TeamEntry, TeamMembershipPlanner } from './dataInputTypes';
import PointSchema from './PointSchema';
import { Driver, Team } from '@/data/sim/f1/simDataTypes';
import drivers from '../data/racing_drivers.json';
import AbstractStanding from './AbstractStanding';
import DriverSimulationResult from './DriverSimulationResult';
import AbstractStandingResultStore from '@/dataBuild/AbstractStandingResultStore';

export default class DriverStanding extends AbstractStanding<Driver> {
    constructor(driverAbbr: string, input: DataInput, races: Race[])
    {
        const entry: DriverEntry = input.drivers[driverAbbr];
        if (typeof entry.team === 'string') {

        }
        const teamName: string = DriverStanding.getTeamName(entry, races, input)
        const teamEntry: TeamEntry = input.teams[teamName];
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

    private static getTeamName(entry: DriverEntry, races: Race[], input: DataInput): string
    {
        if (typeof entry.team === 'string') {
            return entry.team;
        }
        const teamPlanner: TeamMembershipPlanner = <TeamMembershipPlanner>entry.team;
        let lastTeamName = '';
        for (const race of races) {
            if (teamPlanner.hasOwnProperty(race.code)) {
                lastTeamName = teamPlanner[race.code];
            }
        }
        if (lastTeamName !== '') {
            return lastTeamName;
        }

        return teamPlanner[input.races[0].code];
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

    static createEmptyStandings(input: DataInput, races: Race[]): DriverStanding[]
    {
        const drivers: string[] = Object.keys(input.drivers)
        const standings: DriverStanding[] = [];
        for (const driver of drivers) {
            standings.push(
                new DriverStanding(driver, input, races),
            );
        }

        return standings;
    }

    toStandingResult(remainingRaces: AbstractRace[], input: DataInput): AbstractStandingResultStore<Driver>
    {
        return new DriverSimulationResult(this, remainingRaces, input);
    }
}