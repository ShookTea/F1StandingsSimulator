import TeamStanding from './TeamStanding';
import AbstractStandingSorter, { SorterBuilder } from './AbstractStandingSorter';

export default class TeamStandingSorter extends AbstractStandingSorter<TeamStanding> {

    static getBuilder(): SorterBuilder<TeamStanding>
    {
        return {
            buildSorter(): AbstractStandingSorter<TeamStanding> {
                return new TeamStandingSorter(null, null);
            },
            buildBestResultSorter(t: TeamStanding): AbstractStandingSorter<TeamStanding> {
                return new TeamStandingSorter(t, null);
            },
            buildWorstResultSorter(t: TeamStanding): AbstractStandingSorter<TeamStanding> {
                return new TeamStandingSorter(null, t);
            },
        }
    }
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