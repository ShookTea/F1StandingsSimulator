import { AbstractRace as RaceModel } from '@/dataBuild/f1/dataInputTypes';
import Season from './Season';
import PointSchema from './PointSchema';

export default abstract class AbstractRace {
  readonly code: string
  readonly label: string
  readonly pointSchemaBeforeRace: PointSchema
  readonly pointSchemaAfterRace: PointSchema

  constructor(raceModel: RaceModel, season: Season) {
    this.code = raceModel.code;
    this.label = raceModel.label;
    this.pointSchemaAfterRace = season.pointSchemas.get(raceModel.type);
    this.pointSchemaBeforeRace =
      raceModel.typeBeforeRace === null ? this.pointSchemaAfterRace : season.pointSchemas.get(raceModel.typeBeforeRace);
  }
}
