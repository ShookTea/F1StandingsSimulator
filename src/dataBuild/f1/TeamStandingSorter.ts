import TeamSimulationResult from './TeamSimulationResult';
import AbstractStandingSorter, { SorterBuilder } from './AbstractStandingSorter';
import WorstCaseStandingSorter from './WorstCaseStandingSorter';

export default class TeamStandingSorter extends AbstractStandingSorter<TeamSimulationResult> {

    static getBuilder(): SorterBuilder<TeamSimulationResult>
    {
        const defaultSorter = new TeamStandingSorter(null, null);
        return {
            buildSorter(): AbstractStandingSorter<TeamSimulationResult> {
                return defaultSorter;
            },
            buildBestResultSorter(t: TeamSimulationResult): AbstractStandingSorter<TeamSimulationResult> {
                return new TeamStandingSorter(t, null);
            },
            buildWorstResultSorter(t: TeamSimulationResult): AbstractStandingSorter<TeamSimulationResult> {
                return new WorstCaseStandingSorter(t, defaultSorter);
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
