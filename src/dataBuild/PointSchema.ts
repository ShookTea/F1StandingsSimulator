import { FastestLapPointDetails, PointSchema as PointSchemaInterface } from '@/dataBuild/dataInputTypes';

export default class PointSchema {
    readonly points: number[]
    readonly positionsCount: boolean
    readonly fastestLap: FastestLapPointDetails

    constructor(definition: PointSchemaInterface) {
        this.points = definition.points;
        this.positionsCount = definition.positionsCount;
        this.fastestLap = definition.fastestLap;
    }

    getPointsForPosition(position: number, fastestLap: boolean): number
    {
        let points: number = this.points[position - 1] ?? 0;
        if (fastestLap && position <= this.fastestLap.maxPosition) {
            points += this.fastestLap.value;
        }

        return points;
    }
}