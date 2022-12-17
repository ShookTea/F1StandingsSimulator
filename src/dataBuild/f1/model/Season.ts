import { DataInput } from '@/dataBuild/f1/dataInputTypes';
import PointSchema from './PointSchema';
import Race from './Race';
import RemainingRace from './RemainingRace';

export default class Season {
  readonly pointSchemas: Map<string,PointSchema>
  readonly races: Race[]
  readonly remainingRaces: RemainingRace[]

  constructor(dataInput: DataInput) {
    this.pointSchemas = new Map();
    for (const pointSchemaName in dataInput.pointSchemas) {
      this.pointSchemas.set(pointSchemaName, new PointSchema(dataInput.pointSchemas[pointSchemaName]));
    }

    this.races = dataInput.races.map(race => new Race(race, this))
    this.remainingRaces = dataInput.remainingRaces.map(race => new RemainingRace(race, this));
  }
}
