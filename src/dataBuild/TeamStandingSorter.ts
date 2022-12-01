import TeamSimulationResult from './TeamSimulationResult';
import AbstractStandingSorter, { SorterBuilder } from './AbstractStandingSorter';

export default class TeamStandingSorter extends AbstractStandingSorter<TeamSimulationResult> {

    static getBuilder(): SorterBuilder<TeamSimulationResult>
    {
        return {
            buildSorter(): AbstractStandingSorter<TeamSimulationResult> {
                return new TeamStandingSorter(null, null);
            },
            buildBestResultSorter(t: TeamSimulationResult): AbstractStandingSorter<TeamSimulationResult> {
                return new TeamStandingSorter(t, null);
            },
            buildWorstResultSorter(t: TeamSimulationResult): AbstractStandingSorter<TeamSimulationResult> {
                return new TeamStandingSorter(null, t);
            },
        }
    }
    static buildSorter(): TeamStandingSorter
    {
        return new TeamStandingSorter(null, null);
    }

    static buildBestResultSorter(bestFor: TeamSimulationResult): TeamStandingSorter
    {
        return new TeamStandingSorter(bestFor, null);
    }

    static buildWorstResultSorter(worstFor: TeamSimulationResult): TeamStandingSorter
    {
        return new TeamStandingSorter(null, worstFor);
    }
}