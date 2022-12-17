import { AbstractRace, DataInput, DriverEntry, Race, TeamEntry, TeamMembershipPlanner } from './dataInputTypes';
import PointSchema from './model/PointSchema';
import { Driver, Team } from '@/data/sim/f1/simDataTypes';
import drivers from '../../data/racing_drivers.json';
import AbstractStanding from './AbstractStanding';
import DriverSimulationResult from './DriverSimulationResult';
import AbstractStandingResultStore from './AbstractStandingResultStore';

export default class DriverStanding extends AbstractStanding<Driver> {
    constructor(driverAbbr: string, input: DataInput, races: Race[])
    {
        const entry: DriverEntry = input.drivers[driverAbbr];
        if (typeof entry.team === 'string') {

        }
        const teamName: string = DriverStanding.getTeamNameForRace(entry, races[races.length - 1], input)
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

    static getTeamNameForRace(entry: DriverEntry, race: Race, input: DataInput): string
    {
        if (typeof entry.team === 'string') {
            return entry.team;
        }
        const teamPlanner: TeamMembershipPlanner = <TeamMembershipPlanner>entry.team;
        let lastTeamName = '';
        const allRaces: AbstractRace[] = (<AbstractRace[]>input.races).concat(input.remainingRaces);
        for (const raceInDb of allRaces) {
            if (teamPlanner.hasOwnProperty(raceInDb.code)) {
                lastTeamName = teamPlanner[raceInDb.code];
            }
            if (race === undefined || raceInDb.code === race.code) {
                return lastTeamName;
            }
        }
        return teamPlanner[allRaces[0].code];
    }

    toStandingResult(remainingRaces: AbstractRace[], input: DataInput): AbstractStandingResultStore<Driver>
    {
        return new DriverSimulationResult(this, remainingRaces, input);
    }
}
