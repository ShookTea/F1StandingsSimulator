import {describe, expect, test} from '@jest/globals';
import { PointSchema as PointSchemaDefinition } from '@/dataBuild/f1/dataInputTypes';
import PointSchema from '@/dataBuild/f1/model/PointSchema';

type DataSet = {
  [index: string]: DataSetEntry
}
type DataSetEntry = {
  definition: PointSchemaDefinition
  position: number
  fastestLap: boolean
  expected: number
};

const dataSet: DataSet = {
  'returns zero if position outside pointed positions': {
    definition: {
      points: [ 25, 18, 15, 12, 10, 8, 6, 4, 2, 1 ],
      fastestLap: { value: 1, maxPosition: 10 },
      positionsCount: true
    },
    position: 11,
    fastestLap: false,
    expected: 0,
  },
  'returns zero if position outside pointed positions with fastest lap': {
    definition: {
      points: [ 25, 18, 15, 12, 10, 8, 6, 4, 2, 1 ],
      fastestLap: { value: 1, maxPosition: 10 },
      positionsCount: true
    },
    position: 11,
    fastestLap: true,
    expected: 0,
  },
  'returns points from given position': {
    definition: {
      points: [ 25, 18, 15, 12, 10, 8, 6, 4, 2, 1 ],
      fastestLap: { value: 1, maxPosition: 10 },
      positionsCount: true
    },
    position: 2,
    fastestLap: false,
    expected: 18,
  },
  'returns points from given position and fastest lap': {
    definition: {
      points: [ 25, 18, 15, 12, 10, 8, 6, 4, 2, 1 ],
      fastestLap: { value: 1, maxPosition: 10 },
      positionsCount: true
    },
    position: 2,
    fastestLap: true,
    expected: 19,
  },
};

describe('PointSchema', () => {
  for (const testLabel in dataSet) {
    test(testLabel, () => {
      const {definition, position, fastestLap, expected}: DataSetEntry = dataSet[testLabel];
      const pointSchema: PointSchema = new PointSchema(definition);
      const result: number = pointSchema.getPointsForPosition(position, fastestLap);
      expect(result).toBe(expected);
    });
  }
});
