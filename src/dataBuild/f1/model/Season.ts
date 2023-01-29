import { DataInput } from '@/dataBuild/f1/dataInputTypes';
import PointSchema from './PointSchema';
import Race from './Race';
import RemainingRace from './RemainingRace';
import Team from './Team';
import Driver from './Driver';
import AbstractRace from './AbstractRace';

export default class Season {
  readonly pointSchemas: Map<string,PointSchema>;
  readonly races: Race[];
  readonly remainingRaces: RemainingRace[];
  readonly teams: Team[];
  readonly drivers: Driver[];

  constructor(dataInput: DataInput) {
    this.pointSchemas = new Map();
    for (const pointSchemaName in dataInput.pointSchemas) {
      this.pointSchemas.set(pointSchemaName, new PointSchema(dataInput.pointSchemas[pointSchemaName]));
    }

    this.drivers = Driver.buildAllFromInput(dataInput);
    this.teams = Team.buildAllFromInput(dataInput);
    this.races = dataInput.races.map((race, index) => new Race(index, race, this))
    this.remainingRaces = dataInput.remainingRaces.map((race, index) => new RemainingRace(index + this.races.length, race, this));
  }

  getTeamByEntrantName(name: string): Team
  {
    for (const team of this.teams) if (team.entrantName === name) return team;
    throw new Error(`Could not find team by entrant name ${name}`);
  }

  getDriverByAbbreviation(abbr: string): Driver
  {
    for (const driver of this.drivers) if (driver.driverAbbr === abbr) return driver;
    throw new Error(`Could not find driver by abbreviation ${abbr}`);
  }

  getRaceByCode(raceCode: string): AbstractRace
  {
    for (const race of this.races) if (race.code === raceCode) return race;
    for (const race of this.remainingRaces) if (race.code === raceCode) return race;

    throw new Error(`Could not find race ${raceCode}`);
  }
}
