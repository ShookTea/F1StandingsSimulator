import TeamStanding from './TeamStanding';
import AbstractStandingSorter from './AbstractStandingSorter';

export default class TeamStandingSorter extends AbstractStandingSorter<TeamStanding> {

    static buildSorter(): TeamStandingSorter
    {
        return new TeamStandingSorter(null, null);
    }

    static buildBestResultSorter(bestFor: TeamStanding): TeamStandingSorter
    {
        return new TeamStandingSorter(bestFor, null);
    }

    static buildWorstResultSorter(worstFor: TeamStanding): TeamStandingSorter
    {
        return new TeamStandingSorter(null, worstFor);
    }

    protected getPoints(t: TeamStanding): number
    {
        if (this.shouldUseBestValue(t)) {
            return t.maxPoints;
        }

        return t.points;
    }

    protected getWorstCasePosition(t: TeamStanding): number {
        return t.racePositions.getLowestPosition();
    }

    protected getOccurrencesInPosition(t: TeamStanding, position: number, worstCasePosition: number): number {
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