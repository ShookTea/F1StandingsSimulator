import { Standing, Driver, StandingOwner } from '@/data/sim/f1/simDataTypes';
import { AbstractRace, DataInput, Race } from '../dataInputTypes';
import DriverStanding from '../DriverStanding';
import * as lodash from 'lodash';
import AbstractStanding from '../AbstractStanding';
import { SorterBuilder } from '../AbstractStandingSorter';
import AbstractStandingResultStore from '../AbstractStandingResultStore';
import DriverStandingSorter from '../DriverStandingSorter';

type HeadToHeadSituation = {
  standings: Standing<Driver>[];
  position: number;
}

export function generateHeadToHeads(
  input: DataInput,
  calculatedStandings: Standing<Driver>[],
  remainingRaces: AbstractRace[],
  baseStandings: DriverStanding[],
) {
  if (remainingRaces.length === 0) {
    return;
  }
  
  const headToHeadSituations = [
      ...gatherHeadToHeadSituations(calculatedStandings, 2),
      ...gatherHeadToHeadSituations(calculatedStandings, 3),
  ];

  headToHeadSituations.forEach((situation) => simulateHeadToHeadRace(
    input,
    situation,
    remainingRaces[0],
    remainingRaces,
    baseStandings,
  ));
}

function gatherHeadToHeadSituations(
  standings: Standing<Driver>[],
  driversCountInSituation: number
): HeadToHeadSituation[] {
  const result: HeadToHeadSituation[] = [];
  for (let i = 0; i <= standings.length - driversCountInSituation; i++) {
      const expectedBestPosition = i + 1;
      const expectedWorstPosition = i + driversCountInSituation;
      const slice = standings.slice(i, i + driversCountInSituation);
      const validSituation = slice.every(
          (standing) => standing.maxPosition === expectedBestPosition && standing.minPosition === expectedWorstPosition
      );
      if (validSituation) {
          result.push({
              standings: slice,
              position: expectedBestPosition,
          });
      }
  }

  return result;
}

function simulateHeadToHeadRace(
  input: DataInput,
  situation: HeadToHeadSituation,
  nextRace: AbstractRace,
  remainingRaces: AbstractRace[],
  baseStandings: DriverStanding[],
) {
  const positions = [...new Array(baseStandings.length).keys()];
  const positionPermutations = kPermutations(positions, situation.standings.length);
  const baseStandingsToTest: DriverStanding[] = 
    situation.standings.map((standing) => baseStandings.find((s) => s.owner.abbreviation === standing.owner.abbreviation));

  for (const permutation of positionPermutations) {
    const testPositions: string[] = new Array(baseStandings.length).fill('???');
    for (let i = 0; i < permutation.length; i++) {
      const ownerKey = situation.standings[i].owner.abbreviation;
      const position = permutation[i];
      testPositions[position] = ownerKey;
    }

    const fakeRace: Race = {
      ...nextRace,
      fastestLap: undefined, // TODO: run simulations with different fastest laps
      positions: testPositions,
    };

    const standingsForExperiment = lodash.cloneDeep(baseStandingsToTest);
    standingsForExperiment.forEach((standing) => standing.addRaceResult(input, fakeRace));
    
    const result = calculateResultsForStandings(standingsForExperiment, remainingRaces.slice(1), input, DriverStandingSorter.getBuilder());
    if (situation.position === 1 && situation.standings.length === 3 && nextRace.code === 'ABU'
      && permutation[0] + 1 === 6 // NOR
      && permutation[1] + 1 === 2 // VER
      && permutation[2] + 1 === 1 // PIA
    ) {
      console.log(`Situation: ${situation.standings.map(s => s.owner.abbreviation).join(' ')}`)
      console.log(`Permutation: ${permutation.map(v => v + 1).join(' ')}`);
      for (const testedStanding of situation.standings) {
        const driverResult = result.find(r => r.owner.abbreviation === testedStanding.owner.abbreviation);
        console.log(`${driverResult.owner.abbreviation}: ${driverResult.points} won, position between ${driverResult.minPosition} - ${driverResult.maxPosition}`);
      }
    }
  }
}

function kPermutations<T>(arr: T[], k: number): T[][] {
  const result: T[][] = [];
  const used: boolean[] = new Array(arr.length).fill(false);
  const curr: T[] = [];

  function backtrack(): void {
      if (curr.length === k) {
          result.push(curr.slice());
          return;
      }
      for (let i = 0; i < arr.length; i++) {
          if (used[i]) continue;
          used[i] = true;
          curr.push(arr[i]);
          backtrack();
          curr.pop();
          used[i] = false;
      }
  }

  if (k <= 0 || k > arr.length) {
      return [];
  }
  backtrack();
  return result;
}

function calculateResultsForStandings<S extends StandingOwner>(
  standingResult: AbstractStanding<S>[],
  remainingRaces: AbstractRace[],
  input: DataInput,
  sorterBuilder: SorterBuilder<AbstractStandingResultStore<S>>
): Standing<S>[] {
  const dataResult = standingResult.map(s => s.toStandingResult(remainingRaces, input));
  const comparator = sorterBuilder.buildSorter();

  comparator.resetSorter(dataResult);
  dataResult
      .sort((a, b) => comparator.compare(a, b))
      .forEach((standing, index) => standing.position = index + 1);

  dataResult.forEach(d => d.calculatePossiblePositions(dataResult, sorterBuilder));

  return dataResult.map(s => s.convertToResultObject());
}