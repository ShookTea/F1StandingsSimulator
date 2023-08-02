import AbstractStandingResultStore from './AbstractStandingResultStore';

export interface SorterBuilder<T extends AbstractStandingResultStore<any>> {
    buildSorter(): AbstractStandingSorter<T>,
    buildBestResultSorter(t: T): AbstractStandingSorter<T>,
    buildWorstResultSorter(t: T): AbstractStandingSorter<T>,
}

export default abstract class AbstractStandingSorter<T extends AbstractStandingResultStore<any>> {
    private readonly bestResultTestSubject: T;
    private readonly worstResultTestSubject: T;

    protected constructor(
        bestResultTestSubject: T = null,
        worstResultTestSubject: T = null,
    ) {
        this.bestResultTestSubject = bestResultTestSubject;
        this.worstResultTestSubject = worstResultTestSubject;
    }

    resetSorter(elements: T[]): void
    {
    }

    compare(a: T, b: T): number
    {
        const aPoints: number = this.getPoints(a);
        const bPoints: number = this.getPoints(b);

        if (aPoints !== bPoints) {
            return bPoints - aPoints;
        }

        const searchTo: number = Math.max(
            this.getWorstCasePosition(a),
            this.getWorstCasePosition(b),
        ) + 2; // leave two places for worst case checking

        for (let position = 1; position <= searchTo; position++) {
            const aOccurrences: number = this.getOccurrencesInPosition(a, position, searchTo);
            const bOccurrences: number = this.getOccurrencesInPosition(b, position, searchTo);

            if (bOccurrences !== aOccurrences) {
                return bOccurrences - aOccurrences;
            }
        }

        return 0;
    }

    protected shouldUseBestValue(t: T): boolean
    {
        if (t === this.bestResultTestSubject) {
            return true;
        }

        return t !== this.worstResultTestSubject && this.worstResultTestSubject !== null;
    }

    protected shouldUseWorstValue(t: T): boolean
    {
        if (t === this.worstResultTestSubject) {
            return true;
        }

        return t !== this.bestResultTestSubject && this.bestResultTestSubject !== null;
    }

    protected getPoints(t: T): number
    {
        if (this.shouldUseBestValue(t)) {
            return t.maxPoints;
        }

        return t.points;
    }

    protected getWorstCasePosition(t: T): number
    {
        return t.racePositions.getLowestPosition();
    }

    protected getOccurrencesInPosition(t: T, position: number, worstCasePosition: number): number
    {
        let result = t.racePositions.getOccurrencesInPosition(position);

        if (this.shouldUseBestValue(t)) {
            result += ((position === 1 || position === 2) ? t.remainingCountingRaces : 0);
        }
        if (this.shouldUseWorstValue(t)) {
            result += ((position === worstCasePosition || position === worstCasePosition - 1) ? t.remainingCountingRaces : 0);
        }

        return result;
    }
}
