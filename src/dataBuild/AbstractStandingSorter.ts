export default abstract class AbstractStandingSorter<T> {
    private readonly bestResultTestSubject: T;
    private readonly worstResultTestSubject: T;

    protected constructor(
        bestResultTestSubject: T = null,
        worstResultTestSubject: T = null,
    ) {
        this.bestResultTestSubject = bestResultTestSubject;
        this.worstResultTestSubject = worstResultTestSubject;
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

    protected abstract getPoints(t: T): number;
    protected abstract getWorstCasePosition(t: T): number;
    protected abstract getOccurrencesInPosition(t: T, position: number, worstCasePosition: number): number;
}