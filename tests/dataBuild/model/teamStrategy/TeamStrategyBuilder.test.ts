import { describe, test, expect } from '@jest/globals';
import { DriverEntry } from '@/dataBuild/f1/dataInputTypes';
import AbstractDriverTeamStrategy from '@/dataBuild/f1/model/teamStrategy/AbstractDriverTeamStrategy';
import TeamStrategyBuilder from '@/dataBuild/f1/model/teamStrategy/TeamStrategyBuilder';
import Driver from '@/dataBuild/f1/model/Driver';
import SimpleDriverTeamStrategy from '@/dataBuild/f1/model/teamStrategy/SimpleDriverTeamStrategy';
import SeasonSwitchDriverTeamStrategy from '@/dataBuild/f1/model/teamStrategy/SeasonSwitchDriverTeamStrategy';

describe('TeamStrategyBuilder', () => {
  test('Returns simple strategy', () => {
    const driverEntry: DriverEntry = {
      uuid: 'ca72fa0b-1285-4d4c-b7ed-dfafcdbda5eb',
      number: 15,
      team: 'Team1',
    };
    const driver: Driver = new Driver('ABC', driverEntry);

    const strategy: AbstractDriverTeamStrategy = TeamStrategyBuilder.buildStrategy(driver, driverEntry);
    expect(strategy).toBeInstanceOf(SimpleDriverTeamStrategy);
  });
  test('Returns season switch strategy', () => {
    const driverEntry: DriverEntry = {
      uuid: 'ca72fa0b-1285-4d4c-b7ed-dfafcdbda5eb',
      number: 15,
      team: {
        Race1: 'Team1',
        Race2: 'Team2',
      },
    };
    const driver: Driver = new Driver('ABC', driverEntry);

    const strategy: AbstractDriverTeamStrategy = TeamStrategyBuilder.buildStrategy(driver, driverEntry);
    expect(strategy).toBeInstanceOf(SeasonSwitchDriverTeamStrategy);
  });
});
