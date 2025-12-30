import { Standing, Driver, StandingOwner, HeadToHead } from '@/data/sim/f1/simDataTypes';
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

type ResultByPermutation = {
  positionPermutation: number[];
  standings: {
    [driverAbbr: string]: number | 'goes-to-next'
  }
}

export function generateHeadToHeads(
  input: DataInput,
  calculatedStandings: Standing<Driver>[],
  remainingRaces: AbstractRace[],
  baseStandings: DriverStanding[],
): HeadToHead[] {
  if (remainingRaces.length === 0) {
    return [];
  }
  
  const headToHeadSituations = [
      ...gatherHeadToHeadSituations(calculatedStandings, 2),
      ...gatherHeadToHeadSituations(calculatedStandings, 3),
  ];

  return headToHeadSituations.map((situation) => simulateHeadToHeadRace(
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
): HeadToHead {
  const positions = [...new Array(baseStandings.length).keys()];
  const positionPermutations = kPermutations(positions, situation.standings.length);
  const baseStandingsToTest: DriverStanding[] = 
    situation.standings.map((standing) => baseStandings.find((s) => s.owner.abbreviation === standing.owner.abbreviation));

  const resultsByPermutation: ResultByPermutation[] = [];
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
    const resultByPermutation: ResultByPermutation = {
      positionPermutation: permutation,
      standings: {},
    };
    for (const testedStanding of situation.standings) {
      const driverAbbr = testedStanding.owner.abbreviation;
      const driverResult = result.find(r => r.owner.abbreviation === driverAbbr);
      if (driverResult.maxPosition !== driverResult.minPosition) {
        resultByPermutation.standings[driverAbbr] = 'goes-to-next';
      } else {
        resultByPermutation.standings[driverAbbr] = driverResult.maxPosition;
      }
    }
    resultsByPermutation.push(resultByPermutation);
  }

  return convertToOutputData(situation, resultsByPermutation);
}

function convertToOutputData(
  situation: HeadToHeadSituation,
  resultsByPermutation: ResultByPermutation[],
): HeadToHead {
  const transformedResult = transformF1Standings(resultsByPermutation);
  // Remove entries for lower positions
  for (const key in transformedResult) {
    transformedResult[key] = transformedResult[key].filter((option) => option.championship === 1);
  }
  return {
    leadPosition: situation.position,
    optionsByDriver: transformedResult,
    drivers: situation.standings.map((s) => s.owner.abbreviation),
  }

}

type TransformResult = {
  [driverAbbr: string]: {
    position: number; // 1-indexed position in the race
    championship: number; // 1-indexed position in the championship
    rivals: {
      [driverAbbr: string]: number; // 1-indexed best position of each rival that still guarantees given position in championship
    }
  }[]
}

/**
 * This was vibe-coded, because my head was in pain and couldn't focus on how best to transform those results
 * to a usable format. But I've verified it by comparing results to this:
 * https://www.reddit.com/r/formula1/comments/1paqf6r/all_landomaxoscar_win_the_championship_if/
 */
function transformF1Standings(permutationsData: ResultByPermutation[]): TransformResult {
  if (!permutationsData || permutationsData.length === 0) {
    return {};
  }

  // Get all drivers involved
  const drivers = Object.keys(permutationsData[0].standings);

  // Structure: {driver: {race_position: {championship_position: {rival: best_rival_position}}}}
  const driverData = {};
  drivers.forEach(driver => {
    driverData[driver] = {};
  });

  // Process each permutation
  permutationsData.forEach(perm => {
    const positions = perm.positionPermutation;
    const standings = perm.standings;

    // Map driver to their race position (1-indexed)
    const driverRacePositions: Record<string, number> = {};
    drivers.forEach((driver, idx) => {
      driverRacePositions[driver] = positions[idx] + 1;
    });

    // For each driver, track what championship position they achieve
    drivers.forEach(driver => {
      const championshipPos = standings[driver];

      // Skip if position is not guaranteed (e.g., "goes-to-next")
      if (typeof championshipPos !== 'number') {
        return;
      }

      const driverRacePos = driverRacePositions[driver];

      // Get rival positions in this race
      const rivalPositions: Record<string, number> = {};
      drivers.forEach(rival => {
        if (rival !== driver) {
          rivalPositions[rival] = driverRacePositions[rival];
        }
      });

      // Initialize nested objects if they don't exist
      if (!driverData[driver][driverRacePos]) {
        driverData[driver][driverRacePos] = {};
      }

      if (!driverData[driver][driverRacePos][championshipPos]) {
        driverData[driver][driverRacePos][championshipPos] = { ...rivalPositions };
      } else {
        // Update to track the best position each rival can be in
        Object.entries(rivalPositions).forEach(([rival, rivalPos]) => {
          const current = driverData[driver][driverRacePos][championshipPos][rival] || 0;
          driverData[driver][driverRacePos][championshipPos][rival] = Math.min(current, rivalPos);
        });
      }
    });
  });

  // Convert to output format: for each driver's race position, show best championship position achievable
  const result = {};

  drivers.forEach(driver => {
    const conditionsList = [];

    // Get sorted race positions
    const racePositions = Object.keys(driverData[driver])
      .map(Number)
      .sort((a, b) => a - b);

    racePositions.forEach(racePosition => {
      const championshipPositions = driverData[driver][racePosition];

      if (!championshipPositions || Object.keys(championshipPositions).length === 0) {
        return;
      }

      // Get the best (lowest number) championship position achievable from this race position
      const bestChampionshipPos = Math.min(...Object.keys(championshipPositions).map(Number));
      const rivalConditions = championshipPositions[bestChampionshipPos];

      const condition = {
        position: racePosition,
        championship: bestChampionshipPos,
        rivals: rivalConditions
      };

      conditionsList.push(condition);
    });

    if (conditionsList.length > 0) {
      result[driver] = conditionsList;
    }
  });

  return result;
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