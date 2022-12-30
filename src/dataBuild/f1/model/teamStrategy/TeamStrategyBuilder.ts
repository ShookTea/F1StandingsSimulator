import Driver from '../Driver';
import AbstractDriverTeamStrategy from './AbstractDriverTeamStrategy';
import SeasonSwitchDriverTeamStrategy from './SeasonSwitchDriverTeamStrategy';
import SimpleDriverTeamStrategy from './SimpleDriverTeamStrategy';
import { DriverEntry, TeamMembershipPlanner } from '@/dataBuild/f1/dataInputTypes';

export default class TeamStrategyBuilder {
  private constructor() {}

  static buildStrategy(driver: Driver, dataInput: DriverEntry): AbstractDriverTeamStrategy
  {
    const team: string|TeamMembershipPlanner = dataInput.team;

    if (typeof(team) === 'string') {
      return new SimpleDriverTeamStrategy(driver, team);
    } else {
      return new SeasonSwitchDriverTeamStrategy(driver, team);
    }
  }
}
