import Team from './Team';
import AbstractRace from './AbstractRace';
import Driver from './Driver';
import Season from '@/dataBuild/f1/model/Season';

export default abstract class AbstractDriverTeamStrategy {
  private readonly driver: Driver;

  protected constructor(driver: Driver) {
    this.driver = driver;
  }

  getTeamForRace(race: AbstractRace): Team
  {
    const season: Season = race.getSeason();
    if (race.teamSwitchMap && race.teamSwitchMap[this.driver.driverAbbr]) {
      return season.getTeamByEntrantName(race.teamSwitchMap[this.driver.driverAbbr].team);
    }

    return this.getTeamForRaceImpl(race);
  }

  protected abstract getTeamForRaceImpl(race: AbstractRace): Team;
}
