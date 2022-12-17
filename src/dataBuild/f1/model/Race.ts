import AbstractRace from './AbstractRace';
import { Race as RaceModel } from '../dataInputTypes';
import Season from './Season';

export default class Race extends AbstractRace {
  constructor(raceModel: RaceModel, season: Season) {
    super(raceModel, season);
  }
}
