import DriverStanding from '@/dataBuild/DriverStanding';

export default class DriverSimulationResult {
    readonly standing: DriverStanding;
    readonly maxPoints: number;

    position: number = 0;
    maxPosition: number = 0;
    minPosition: number = 0;

    constructor(standing: DriverStanding, maxRemainingPoints: number) {
        this.standing = standing;
        this.maxPoints = standing.points + maxRemainingPoints;
    }
}