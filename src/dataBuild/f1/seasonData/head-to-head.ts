import { Standing, Driver } from '@/data/sim/f1/simDataTypes';
import { DataInput } from '../dataInputTypes';

type HeadToHeadSituation = {
  standings: Standing<Driver>[];
  position: number;
}

export function generateHeadToHeads(
  input: DataInput,
  calculatedStandings: Standing<Driver>[]
) {
  const headToHeadSituations = [
      ...gatherHeadToHeadSituations(calculatedStandings, 2),
      ...gatherHeadToHeadSituations(calculatedStandings, 3),
  ];
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