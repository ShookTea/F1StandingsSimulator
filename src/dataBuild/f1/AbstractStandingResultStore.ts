import { Standing, StandingOwner } from '@/data/sim/f1/simDataTypes';
import RacePositionMapping from './RacePositionMapping';
import { SorterBuilder } from './AbstractStandingSorter';
import AbstractStanding from './AbstractStanding';
import { AbstractRace, DataInput } from './dataInputTypes';

export default abstract class AbstractStandingResultStore<T extends StandingOwner> {
    owner: T;

    position: number = 0;
    maxPosition: number = 0;
    minPosition: number = 0;
    points: number;
    racePositions: RacePositionMapping;
    maxPoints: number;
    maxRemainingPoints: number;
    remainingCountingRaces: number;
    remainingAllPoints: number;
    notes: string[] = [];

    protected constructor(
        standing: AbstractStanding<T>,
        remainingRaces: AbstractRace[],
        input: DataInput,
        maxRemainingPoints: number,
    ) {
        this.owner = standing.owner;
        this.remainingCountingRaces = remainingRaces
            .filter(r => input.pointSchemas[r.type].positionsCount)
            .length;
        this.remainingAllPoints = remainingRaces
          .map(r => input.pointSchemas[r.type])
          .map(ps => ps.fastestLap.value + ps.points.reduce((a, b) => a + b), 0)
          .reduce((a, b) => a + b, 0)
        this.points = standing.points;
        this.maxRemainingPoints = maxRemainingPoints;
        this.maxPoints = this.points + maxRemainingPoints;
        this.racePositions = standing.racePositions;
        this.notes = standing.notes;
    }

    convertToResultObject(): Standing<T>
    {
        return {
            owner: this.owner,
            points: this.points,
            maxPoints: this.maxPoints,
            position: this.position,
            maxPosition: this.maxPosition,
            minPosition: this.minPosition,
            racePositions: this.racePositions.racePositions,
            note: this.notes.join(' '),
        };
    }

    calculatePossiblePositions(
        allResults: AbstractStandingResultStore<T>[],
        sorterBuilder: SorterBuilder<AbstractStandingResultStore<T>>,
    ): void {
        const bestCaseSorter = sorterBuilder.buildBestResultSorter(this);
        const worstCaseSorter = sorterBuilder.buildWorstResultSorter(this);

        bestCaseSorter.resetSorter(allResults);
        worstCaseSorter.resetSorter(allResults);

        this.maxPosition = [...allResults]
            .sort((a, b) => bestCaseSorter.compare(a, b))
            .indexOf(this) + 1;
        this.minPosition = [...allResults]
            .sort((a, b) => worstCaseSorter.compare(a, b))
            .indexOf(this) + 1;
    }

    isTemporaryAndNotRacedYet(): boolean
    {
        return false;
    }

    clone(): this
    {
        const clone: this = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        clone.racePositions = clone.racePositions.clone();
        return clone;
    }
}
