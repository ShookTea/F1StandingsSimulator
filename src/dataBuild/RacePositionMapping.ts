import PointSchema from '@/dataBuild/PointSchema';
import { RacePositionMap } from '@/data/sim/f1/simDataTypes';

export default class RacePositionMapping {
    racePositions: RacePositionMap = {};
    private entriesCount: number = 0;

    registerPosition(position: number, pointSchema: PointSchema): void
    {
        this.entriesCount++;
        if (pointSchema.positionsCount) {
            if (!this.racePositions.hasOwnProperty(position)) {
                this.racePositions[position] = 0;
            }
            this.racePositions[position]++;
        }
    }

    add(other: RacePositionMapping): RacePositionMapping
    {
        const result = new RacePositionMapping();
        result.entriesCount = this.entriesCount + other.entriesCount;

        for (let p = 1; p <= Math.max(this.getLowestPosition(), other.getLowestPosition()); p++) {
            result.racePositions[p] = this.getOccurrencesInPosition(p) + other.getOccurrencesInPosition(p);
        }

        return result;
    }

    getLowestPosition(): number
    {
        return Object.keys(this.racePositions)
            .map(i => parseInt(i))
            .sort((a, b) => b - a)[0] ?? 0;
    }

    getOccurrencesInPosition(position: number): number
    {
        return this.racePositions[position] ?? 0;
    }

    hasRaced(): boolean
    {
        return this.entriesCount > 0;
    }
}