import { AbstractRace, DataInput, Race } from '@/dataBuild/dataInputTypes';
import RacePositionMapping from './RacePositionMapping';
import { StandingOwner } from '@/data/sim/f1/simDataTypes';
import AbstractStandingResultStore from '@/dataBuild/AbstractStandingResultStore';

export default abstract class AbstractStanding<T extends StandingOwner> {
    readonly owner: T
    points: number = 0;
    racePositions: RacePositionMapping = new RacePositionMapping();
    notes: string[] = [];

    constructor(owner: T) {
        this.owner = owner;
    }

    abstract addRaceResult(input: DataInput, race: Race): void;

    abstract toStandingResult(remainingRaces: AbstractRace[], input: DataInput): AbstractStandingResultStore<T>;
}