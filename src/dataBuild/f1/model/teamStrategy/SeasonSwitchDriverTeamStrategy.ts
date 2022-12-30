import AbstractDriverTeamStrategy from './AbstractDriverTeamStrategy';
import Team from '../Team';
import AbstractRace from '../AbstractRace';
import { TeamMembershipPlanner } from '@/dataBuild/f1/dataInputTypes';
import Season from '../Season';
import Driver from '../Driver';

export class SeasonSwitchDriverTeamStrategy extends AbstractDriverTeamStrategy {
  private readonly teamPlanner: TeamMembershipPlanner;
  constructor(driver: Driver, teamPlanner: TeamMembershipPlanner) {
    super(driver);
    this.teamPlanner = teamPlanner;
  }

  protected getTeamForRaceImpl(race: AbstractRace): Team {
    const season: Season = race.getSeason();
    let bestTeam: Team|null = null;
    let bestRoundNumber: number = -1;
    const currentRoundNumber: number = race.roundNumber;

    for (const raceCode in this.teamPlanner) {
      const raceByCode: AbstractRace = season.getRaceByCode(raceCode);
      if (raceByCode.roundNumber <= currentRoundNumber && raceByCode.roundNumber > bestRoundNumber) {
        bestRoundNumber = raceByCode.roundNumber;
        bestTeam = season.getTeamByEntrantName(this.teamPlanner[raceCode]);
      }
    }

    if (bestTeam === null) {
      throw new Error(`Could not find team for race ${race.code} with planner ${this.teamPlanner}`);
    }

    return bestTeam;
  }
}
