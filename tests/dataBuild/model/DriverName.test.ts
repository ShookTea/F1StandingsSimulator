import { describe, test, expect } from '@jest/globals';
import { DriverDetail } from '@/data/sim/f1/simDataTypes';
import DriverName from '@/dataBuild/f1/model/DriverName';

type DataSet = {
  [testName: string]: DataSetEntry
};

type DataSetEntry = {
  input: DriverDetail
  givenName: string
  familyName: string
  familyNameFirst: boolean
  fullName: string
};

const dataSet: DataSet = {
  'Displays given name first if input has familyNameFirst = false': {
    input: { givenName: 'Foo', familyName: 'Bar', familyNameFirst: false },
    givenName: 'Foo',
    familyName: 'Bar',
    familyNameFirst: false,
    fullName: 'Foo Bar',
  },
  'Displays given name first if input has undefined familyNameFirst': {
    input: { givenName: 'Foo', familyName: 'Bar' },
    givenName: 'Foo',
    familyName: 'Bar',
    familyNameFirst: false,
    fullName: 'Foo Bar',
  },
  'Displays family name first if input has familyNameFirst = true': {
    input: { givenName: 'Foo', familyName: 'Bar', familyNameFirst: true },
    givenName: 'Foo',
    familyName: 'Bar',
    familyNameFirst: true,
    fullName: 'Bar Foo',
  },
}

describe('DriverName', () => {
  for (const testName in dataSet) test(testName, () => {
    const { input, givenName, familyName, familyNameFirst, fullName } = dataSet[testName];
    const uuid = 'f102162a-08c3-4a71-8bf6-dd17fb1ad3fd';
    const fullDataInput = {};
    fullDataInput[uuid] = input;
    const driverName: DriverName = new DriverName(uuid, fullDataInput);

    expect(driverName.getGivenName()).toBe(givenName);
    expect(driverName.getFamilyName()).toBe(familyName);
    expect(driverName.isFamilyNameFirst()).toBe(familyNameFirst);
    expect(driverName.getFullName()).toBe(fullName);
  });
});
