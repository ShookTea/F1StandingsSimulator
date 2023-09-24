import AbstractStandingResultStore from './AbstractStandingResultStore';
import AbstractStandingSorter from './AbstractStandingSorter';
import PointSchema from './PointSchema';

export default class WorstCaseStandingSorter<T extends AbstractStandingResultStore<any>> extends AbstractStandingSorter<T> {
  private readonly testSubject: T
  private readonly defaultSorter: AbstractStandingSorter<T>
  constructor(
    testSubject: T,
    defaultSorter: AbstractStandingSorter<T>,
  ) {
    super(null, testSubject)
    this.testSubject = testSubject;
    this.defaultSorter = defaultSorter;
  }

  private elements: T[] = [];
  private uuids: string[] = [];

  resetSorter(elements: T[]) {
    super.resetSorter(elements);
    this.elements = elements
      .map(orig => orig.clone())
    this.defaultSorter.resetSorter(this.elements);
    this.elements.sort((a, b) => this.defaultSorter.compare(a, b));
    this.uuids = this.elements.map(e => e.owner.uuid);

    let pointsToDistribute = this.testSubject.remainingAllPoints;
    const testSubjectIndex = this.uuids.indexOf(this.testSubject.owner.uuid);

    for (let i = testSubjectIndex + 1; i < this.elements.length && pointsToDistribute > 0; i++) {
      const currentElem = this.elements[i];
      if (currentElem.isTemporaryAndNotRacedYet()) {
        continue;
      }

      const pointsDiff = Math.min(this.testSubject.points - currentElem.points, this.testSubject.maxRemainingPoints);
      if (pointsDiff > pointsToDistribute) {
        break;
      }

      currentElem.points += pointsDiff;
      pointsToDistribute -= pointsDiff;
      currentElem.racePositions.registerPosition(1, new PointSchema({
        points: [],
        positionsCount: true,
        fastestLap: {value: 0, maxPosition: -1}
      }));

      if (pointsDiff === 0 && pointsToDistribute > 0) {
        currentElem.points++;
        pointsToDistribute--;
      }

      if (this.defaultSorter.compare(this.testSubject, currentElem) <= 0 && pointsToDistribute > 0) {
        currentElem.points++;
        pointsToDistribute--;
      }
    }

    this.elements.sort((a, b) => this.defaultSorter.compare(a, b));
    const newIndex = this.elements.map(e => e.owner.uuid).indexOf(this.testSubject.owner.uuid);

    this.uuids = this.uuids.filter(elem => elem !== this.testSubject.owner.uuid);
    this.uuids = [
      ...this.uuids.slice(0, newIndex),
      this.testSubject.owner.uuid,
      ...this.uuids.slice(newIndex),
    ];
  }

  compare(a: T, b: T): number {
    if (this.elements.length === 0) {
      throw new Error('Did not call "resetSorter" before comparing');
    }

    const aIndex = this.uuids.indexOf(a.owner.uuid);
    const bIndex = this.uuids.indexOf(b.owner.uuid);
    return aIndex - bIndex;
  }
}
