import { Standing, StandingOwner } from '@/data/sim/f1/simDataTypes';
import RacePositionMapping from '@/dataBuild/RacePositionMapping';
import { SorterBuilder } from '@/dataBuild/AbstractStandingSorter';

export default abstract class AbstractStandingResultStore<T extends StandingOwner> {
    owner: T;

    position: number = 0;
    maxPosition: number = 0;
    minPosition: number = 0;
    points: number;
    racePositions: RacePositionMapping;
    maxPoints: number;
    remainingCountingRaces: number;

    protected constructor(owner: T) {
        this.owner = owner;
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
