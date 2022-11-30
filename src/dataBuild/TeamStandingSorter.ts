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
}