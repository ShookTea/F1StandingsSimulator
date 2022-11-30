import DriverSimulationResult from './DriverSimulationResult';
import AbstractStandingSorter from './AbstractStandingSorter';

export default class DriverStandingSorter extends AbstractStandingSorter<DriverSimulationResult> {
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

        return (a.isTemporaryAndNotRacedYet() ? 1 : 0) - (b.isTemporaryAndNotRacedYet() ? 1 : 0);
    }

    protected getPoints(dsr: DriverSimulationResult): number
    {
        if (dsr.isTemporaryAndNotRacedYet()) {
            return dsr.standing.points;
        }

        if (this.shouldUseBestValue(dsr)) {
            return dsr.maxPoints;
        }

        return dsr.standing.points;
    }

    protected getWorstCasePosition(t: DriverSimulationResult): number
    {
        return t.standing.racePositions.getLowestPosition();
    }

    protected getOccurrencesInPosition(dsr: DriverSimulationResult, position: number, worstCasePosition: number): number
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
}