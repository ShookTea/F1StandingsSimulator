import DriverSimulationResult from '@/dataBuild/DriverSimulationResult';

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

    private getPoints(dsr: DriverSimulationResult): number
    {
        if (dsr === this.bestResultTestSubject) {
            return dsr.maxPoints;
        }
        if (dsr === this.worstResultTestSubject) {
            return dsr.standing.points;
        }
        if (dsr !== this.worstResultTestSubject && this.worstResultTestSubject !== null) {
            return dsr.maxPoints;
        }

        return dsr.standing.points;
    }

    compare(a: DriverSimulationResult, b: DriverSimulationResult): number
    {
        const aPoints: number = this.getPoints(a);
        const bPoints: number = this.getPoints(b);

        if (aPoints !== bPoints) {
            return bPoints - aPoints;
        }

        return b.standing.racePositions.compareWith(a.standing.racePositions);
    }
}