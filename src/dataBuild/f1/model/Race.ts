import AbstractRace from './AbstractRace';
import { Race as RaceModel } from '../dataInputTypes';
import Season from './Season';
import Driver from './Driver';

export default class Race extends AbstractRace {
  private readonly fastestLapDriver: Driver|null;

  constructor(roundNumber: number, raceModel: RaceModel, season: Season) {
    super(roundNumber, raceModel, season, raceModel.teamSwitch);
    this.fastestLapDriver = raceModel.fastestLap === null ? null : season.getDriverByAbbreviation(raceModel.fastestLap);
  }
}
