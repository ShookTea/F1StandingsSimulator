import { describe, expect, test } from '@jest/globals';
import Season from '@/dataBuild/f1/model/Season';
import mockData from '../MockInputData';
import Team from '@/dataBuild/f1/model/Team';
import Driver from '@/dataBuild/f1/model/Driver';
import { SimpleDriverTeamStrategy } from '@/dataBuild/f1/model/teamStrategy/SimpleDriverTeamStrategy';

describe('SimpleDriverTeamStrategy', () => {
  const season = new Season(mockData);
  const driver: Driver = season.drivers.find(d => d.driverAbbr === 'DR6');
  const team1: Team = season.getTeamByEntrantName('TeamName1');
  const team3: Team = season.getTeamByEntrantName('TeamName3');

  const simpleStrategy: SimpleDriverTeamStrategy = new SimpleDriverTeamStrategy(driver, 'TeamName3');

  test('Returns valid team on beginning of season', () => {
    expect(simpleStrategy.getTeamForRace(season.races[0])).toBe(team3);
  });

  test('Returns valid team for single switch', () => {
    expect(simpleStrategy.getTeamForRace(season.races[2])).toBe(team1);
  });

  test('Returns valid team after single switch', () => {
    expect(simpleStrategy.getTeamForRace(season.races[3])).toBe(team3);
  });
});
