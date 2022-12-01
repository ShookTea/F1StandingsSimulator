import { Team } from '@/data/sim/f1/simDataTypes';
import { AbstractRace, DataInput, Race, TeamEntry, TeamPointChange, TeamSwitch } from '@/dataBuild/dataInputTypes';
import PointSchema from './PointSchema';
import AbstractStanding from './AbstractStanding';
import AbstractStandingResultStore from '@/dataBuild/AbstractStandingResultStore';
import TeamSimulationResult from './TeamSimulationResult';

export default class TeamStanding extends AbstractStanding<Team> {
    readonly driversAbbr: string[];

    private constructor(team: Team, drivers: string[]) {
        super(team);
        this.driversAbbr = drivers;
    }

    static createEmptyStandings(input: DataInput): TeamStanding[]
    {
        const entries = Object.keys(input.teams);
        const standings: TeamStanding[] = [];
        for (const entry of entries) {
            const teamEntry: TeamEntry = input.teams[entry];
            const team: Team = {
                entry,
                ...teamEntry,
            };

            const driverAbbr = Object.keys(input.drivers)
                .filter(abbr => input.drivers[abbr].team === entry);

            standings.push(new TeamStanding(team, driverAbbr));
        }

        return standings;
    }

    addRaceResult(input: DataInput, race: Race): void
    {
        for (const abbr of this.getDriversAbbreviationsForRace(input, race)) {
            const index: number = race.positions.indexOf(abbr);
            if (index === -1) {
                continue;
            }
            const pointSchema: PointSchema = new PointSchema(input.pointSchemas[race.type]);
            const position: number = index + 1;

            this.points += pointSchema.getPointsForPosition(position, abbr === race.fastestLap);
            this.racePositions.registerPosition(position, pointSchema);
        }

        if (race.teamPointChanges !== undefined) {
            const entry: TeamPointChange = race.teamPointChanges[this.owner.entry];
            if (entry !== undefined) {
                this.points += entry.points;
                this.notes.push(entry.description);
            }
        }
    }

    private getDriversAbbreviationsForRace(input: DataInput, race: Race): string[]
    {
        let abbreviations = [...this.driversAbbr];

        if (race.teamSwitch !== undefined) {
            for (const switchedDriver in race.teamSwitch) {
                const teamSwitchEntry: TeamSwitch = race.teamSwitch[switchedDriver];
                if (abbreviations.includes(switchedDriver)) {
                    abbreviations = abbreviations.filter(d => d !== switchedDriver);
                    this.notes.push(`Driver ${switchedDriver} of ${this.owner.entry} drove for ${teamSwitchEntry.team} during ${race.label}.`);
                } else if (teamSwitchEntry.team === this.owner.entry) {
                    abbreviations.push(switchedDriver);
                    const driverTeam = input.drivers[switchedDriver].team;
                    this.notes.push(`Driver ${switchedDriver} of ${driverTeam} drove for ${this.owner.entry} during ${race.label}.`);
                }
            }
        }

        return abbreviations;
    }

    toStandingResult(remainingRaces: AbstractRace[], input: DataInput): AbstractStandingResultStore<Team>
    {
        return new TeamSimulationResult(this, remainingRaces, input);
    }
}

