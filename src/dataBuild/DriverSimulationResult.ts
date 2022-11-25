import DriverStanding from '@/dataBuild/DriverStanding';

export default class DriverSimulationResult {
    readonly standing: DriverStanding;
    readonly maxPoints: number;
    readonly remainingCountingRaces: number;

    position: number = 0;
    maxPosition: number = 0;
    minPosition: number = 0;

    constructor(standing: DriverStanding, maxRemainingPoints: number, remainingCountingRaces: number)
    {
        this.standing = standing;
        this.maxPoints = standing.points + maxRemainingPoints;
        this.remainingCountingRaces = remainingCountingRaces;
    }

    compareWith(other: DriverSimulationResult): number
    {
        if (other.standing.points !== this.standing.points) {
            return other.standing.points - this.standing.points;
        }

        return this.standing.racePositions.compareWith(other.standing.racePositions);
    }

    compareWithLookingForBestResult(other: DriverSimulationResult): number
    {
        if (other.standing.points !== this.maxPoints) {
            return other.standing.points - this.maxPoints;
        }

        return this.standing.racePositions.compareWithLookingForBestResult(other.standing.racePositions, this.remainingCountingRaces);
    }

    compareWithLookingForWorstResult(other: DriverSimulationResult): number
    {
        if (other.maxPoints !== this.standing.points) {
            return other.maxPoints - this.standing.points;
        }

        return this.standing.racePositions.compareWithLookingForWorstResult(other.standing.racePositions, this.remainingCountingRaces);
    }
}