import DriverSimulationResult from './DriverSimulationResult';

export default class DriverStandingSorter {
    private readonly bestResultTestSubject: DriverSimulationResult;
    private readonly worstResultTestSubject: DriverSimulationResult;

    private constructor(
        bestResultTestSubject: DriverSimulationResult = null,
        worstResultTestSubject: DriverSimulationResult = null,
    ) {
        this.bestResultTestSubject = bestResultTestSubject;
        this.worstResultTestSubject = worstResultTestSubject;
    }

    static buildSorter(): DriverStandingSorter
    {
        return new DriverStandingSorter(null, null);
    }

    static buildBestResultSorter(bestFor: DriverSimulationResult): DriverStandingSorter
    {
        return new DriverStandingSorter(bestFor, null);
    }

    static buildWorstResultSorter(worstFor: DriverSimulationResult): DriverStandingSorter
    {
        return new DriverStandingSorter(null, worstFor);
    }

    compare(a: DriverSimulationResult, b: DriverSimulationResult): number
    {
        const aPoints: number = this.getPoints(a);
        const bPoints: number = this.getPoints(b);

        if (aPoints !== bPoints) {
            return bPoints - aPoints;
        }

        const searchTo: number = Math.max(
            a.standing.racePositions.getLowestPosition(),
            b.standing.racePositions.getLowestPosition(),
        ) + 1; // leave one place for worst case checking

        for (let position = 1; position <= searchTo; position++) {
            const aOccurrences: number = this.getOccurrencesInPosition(a, position, searchTo);
            const bOccurrences: number = this.getOccurrencesInPosition(b, position, searchTo);

            if (bOccurrences !== aOccurrences) {
                return bOccurrences - aOccurrences;
            }
        }

        if (a.isTemporaryAndNotRacedYet()) {
            return 1;
        }
        if (b.isTemporaryAndNotRacedYet()) {
            return -1;
        }

        return 0;
    }

    private getPoints(dsr: DriverSimulationResult): number
    {
        if (dsr.isTemporaryAndNotRacedYet()) {
            return dsr.standing.points;
        }

        if (this.shouldUseBestValue(dsr)) {
            return dsr.maxPoints;
        }

        return dsr.standing.points;
    }

    private getOccurrencesInPosition(dsr: DriverSimulationResult, position: number, worstCasePosition: number): number
    {
        if (dsr.isTemporaryAndNotRacedYet()) {
            return dsr.standing.racePositions.getOccurrencesInPosition(position);
        }

        if (this.shouldUseBestValue(dsr)) {
            return dsr.standing.racePositions.getOccurrencesInPosition(position) + (position === 1 ? dsr.remainingCountingRaces : 0);
        }

        if (this.shouldUseWorstValue(dsr)) {
            return dsr.standing.racePositions.getOccurrencesInPosition(position) + (position === worstCasePosition ? dsr.remainingCountingRaces : 0);
        }

        return dsr.standing.racePositions.getOccurrencesInPosition(position);
    }

    private shouldUseBestValue(dsr: DriverSimulationResult): boolean
    {
        if (dsr === this.bestResultTestSubject) {
            return true;
        }

        return dsr !== this.worstResultTestSubject && this.worstResultTestSubject !== null;
    }

    private shouldUseWorstValue(dsr: DriverSimulationResult): boolean
    {
        if (dsr === this.worstResultTestSubject) {
            return true;
        }

        return dsr !== this.bestResultTestSubject && this.bestResultTestSubject !== null;
    }
}