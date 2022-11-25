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

    calculatePossiblePositions(allResults: DriverSimulationResult[]): void
    {
        const maxPositionPointsSupplier: PointsSupplier = dsr => dsr === this ? dsr.maxPoints : dsr.standing.points;
        const minPositionPointsSupplier: PointsSupplier = dsr => dsr === this ? dsr.standing.points : dsr.maxPoints;

        this.maxPosition = [...allResults]
            .sort((a, b) => a.compareWith(b, maxPositionPointsSupplier))
            .indexOf(this) + 1;
        this.minPosition = [...allResults]
            .sort((a, b) => a.compareWith(b, minPositionPointsSupplier))
            .indexOf(this) + 1;
    }

    compareWith(other: DriverSimulationResult, pointsSupplier: PointsSupplier = dsr => dsr.standing.points): number
    {
        const otherPoints: number = pointsSupplier(other);
        const thisPoints: number = pointsSupplier(this);
        if (otherPoints !== thisPoints) {
            return otherPoints - thisPoints;
        }

        return this.standing.racePositions.compareWith(other.standing.racePositions);
    }
}