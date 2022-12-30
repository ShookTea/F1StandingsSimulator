import AbstractDriverTeamStrategy from './AbstractDriverTeamStrategy';
import Team from '../Team';
import AbstractRace from '../AbstractRace';
import Driver from '../Driver';

export default class SimpleDriverTeamStrategy extends AbstractDriverTeamStrategy {
  private readonly team: string;

  constructor(driver: Driver, team: string) {
    super(driver);
    this.team = team;
  }

  protected getTeamForRaceImpl(race: AbstractRace): Team {
    return race.getSeason().getTeamByEntrantName(this.team);
  }
}
