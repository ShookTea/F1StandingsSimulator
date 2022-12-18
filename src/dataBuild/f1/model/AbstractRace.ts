import { AbstractRace as RaceModel, TeamSwitchMap } from '@/dataBuild/f1/dataInputTypes';
import Season from './Season';
import PointSchema from './PointSchema';

export default abstract class AbstractRace {
  readonly code: string;
  readonly label: string;
  readonly pointSchemaBeforeRace: PointSchema;
  readonly pointSchemaAfterRace: PointSchema;
  readonly season: Season;
  readonly roundNumber: number;
  readonly teamSwitchMap: TeamSwitchMap;

  protected constructor(roundNumber: number, raceModel: RaceModel, season: Season, teamSwitchMap: TeamSwitchMap) {
    this.roundNumber = roundNumber;
    this.code = raceModel.code;
    this.label = raceModel.label;
    this.pointSchemaAfterRace = season.pointSchemas.get(raceModel.type);
    this.pointSchemaBeforeRace =
      raceModel.typeBeforeRace === null ? this.pointSchemaAfterRace : season.pointSchemas.get(raceModel.typeBeforeRace);
    this.season = season;
    this.teamSwitchMap = teamSwitchMap;
  }

  getSeason(): Season {
    return this.season;
  }
}
