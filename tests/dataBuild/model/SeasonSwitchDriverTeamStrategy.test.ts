import { describe, expect, test } from '@jest/globals';
import Season from '@/dataBuild/f1/model/Season';
import { TeamMembershipPlanner } from '@/dataBuild/f1/dataInputTypes';
import mockData from './MockInputData';
import Team from '@/dataBuild/f1/model/Team';
import Driver from '@/dataBuild/f1/model/Driver';
import { SeasonSwitchDriverTeamStrategy } from '@/dataBuild/f1/model/SeasonSwitchDriverTeamStrategy';

describe('SeasonSwitchDriverTeamStrategy', () => {
  const season = new Season(mockData);
  const driver: Driver = season.drivers.find(d => d.driverAbbr === 'DR1');
  const planner: TeamMembershipPlanner = <TeamMembershipPlanner>mockData.drivers['DR1'].team;
  const team1: Team = season.getTeamByEntrantName('TeamName1');
  const team2: Team = season.getTeamByEntrantName('TeamName2');
  const team3: Team = season.getTeamByEntrantName('TeamName3');

  const seasonSwitchStrategy: SeasonSwitchDriverTeamStrategy = new SeasonSwitchDriverTeamStrategy(driver, planner);

  test('Returns valid team on beginning of season', () => {
    expect(seasonSwitchStrategy.getTeamForRace(season.races[0])).toBe(team1);
  });

  test('Returns valid team between changes', () => {
    expect(seasonSwitchStrategy.getTeamForRace(season.races[2])).toBe(team1);
  });

  test('Returns valid team for single switch', () => {
    expect(seasonSwitchStrategy.getTeamForRace(season.races[3])).toBe(team3);
  });

  test('Returns valid team on first race after switch', () => {
    expect(seasonSwitchStrategy.getTeamForRace(season.races[4])).toBe(team2);
  });

  test('Returns valid team just after switch', () => {
    expect(seasonSwitchStrategy.getTeamForRace(season.remainingRaces[0])).toBe(team2);
  });

  test('Returns valid team on end of season', () => {
    expect(seasonSwitchStrategy.getTeamForRace(season.remainingRaces[4])).toBe(team2);
  });
});
