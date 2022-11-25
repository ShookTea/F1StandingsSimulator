import DriverStanding from '@/dataBuild/DriverStanding';

type PointsSupplier = (dsr: DriverSimulationResult) => number;

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

    convertToResultObject(): Standing
    {
        return {
            driver: this.standing.driver,
            uuid: this.standing.uuid,
            temporary: this.standing.temporary,
            points: this.standing.points,
            maxPoints: this.maxPoints,
            position: this.position,
            maxPosition: this.maxPosition,
            minPosition: this.minPosition,
            racePositions: this.standing.racePositions.racePositions,
        };
    }

    compareWith(other: DriverSimulationResult, pointsSupplier: PointsSupplier = dsr => dsr.standing.points): number
    {
        const otherPoints: number = pointsSupplier(other);
        const thisPoints: number = pointsSupplier(this);
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