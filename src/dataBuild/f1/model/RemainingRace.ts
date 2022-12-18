import AbstractRace from './AbstractRace';
import { RemainingRace as RaceModel } from '@/dataBuild/f1/dataInputTypes';
import Season from './Season';

export default class RemainingRace extends AbstractRace {
  constructor(roundNumber: number, raceModel: RaceModel, season: Season) {
    super(roundNumber, raceModel, season, {});
  }
}
