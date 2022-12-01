import { Standing, StandingOwner } from '@/data/sim/f1/simDataTypes';
import RacePositionMapping from '@/dataBuild/RacePositionMapping';
import { SorterBuilder } from '@/dataBuild/AbstractStandingSorter';
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
    remainingCountingRaces: number;
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
        this.points = standing.points;
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

        this.maxPosition = [...allResults]
            .sort((a, b) => bestCaseSorter.compare(a, b))
            .indexOf(this) + 1;
        this.minPosition = [...allResults]
            .sort((a, b) => worstCaseSorter.compare(a, b))
            .indexOf(this) + 1;
    }
}
