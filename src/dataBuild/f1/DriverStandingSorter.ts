import DriverSimulationResult from './DriverSimulationResult';
import AbstractStandingSorter, { SorterBuilder } from './AbstractStandingSorter';
import WorstCaseStandingSorter from './WorstCaseStandingSorter';

export default class DriverStandingSorter extends AbstractStandingSorter<DriverSimulationResult> {
    static getBuilder(): SorterBuilder<DriverSimulationResult>
    {
        const defaultSorter = new DriverStandingSorter(null, null);
        return {
            buildSorter(): AbstractStandingSorter<DriverSimulationResult> {
                return defaultSorter;
            },
            buildBestResultSorter(t: DriverSimulationResult): AbstractStandingSorter<DriverSimulationResult> {
                return new DriverStandingSorter(t, null);
            },
            buildWorstResultSorter(t: DriverSimulationResult): AbstractStandingSorter<DriverSimulationResult> {
                return new WorstCaseStandingSorter(t, defaultSorter);
            }
        };
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
        const result = super.compare(a, b);
        if (result !== 0) {
            return result;
        }

        return (a.isTemporaryAndNotRacedYet() ? 1 : 0) - (b.isTemporaryAndNotRacedYet() ? 1 : 0);
    }

    protected getPoints(t: DriverSimulationResult): number
    {
        if (t.isTemporaryAndNotRacedYet()) {
            return t.points;
        }

        return super.getPoints(t);
    }

    protected getOccurrencesInPosition(t: DriverSimulationResult, position: number, worstCasePosition: number): number
    {
        if (t.isTemporaryAndNotRacedYet()) {
            return t.racePositions.getOccurrencesInPosition(position);
        }

        return super.getOccurrencesInPosition(t, position, worstCasePosition);
    }
}
