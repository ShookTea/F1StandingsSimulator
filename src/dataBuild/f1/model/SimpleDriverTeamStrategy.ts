import AbstractDriverTeamStrategy from './AbstractDriverTeamStrategy';
import Team from './Team';
import AbstractRace from './AbstractRace';
import Driver from './Driver';

export class SimpleDriverTeamStrategy extends AbstractDriverTeamStrategy {
  private readonly team: Team;

  constructor(driver: Driver, team: Team) {
    super(driver);
    this.team = team;
  }

  protected getTeamForRaceImpl(race: AbstractRace): Team {
    return this.team;
  }
}
