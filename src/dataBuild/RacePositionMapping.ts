import PointSchema from '@/dataBuild/PointSchema';

export default class RacePositionMapping {
    racePositions: RacePositionMap = {};

    registerPosition(position: number, pointSchema: PointSchema): void
    {
        if (pointSchema.positionsCount) {
            if (!this.racePositions.hasOwnProperty(position)) {
                this.racePositions[position] = 0;
            }
            this.racePositions[position]++;
        }
    }

    private getLowestPosition(): number
    {
        return Object.keys(this.racePositions).map(parseInt).sort().reverse()[0] ?? 0;
    }

    private getOccurencesInPosition(position: number): number
    {
        return this.racePositions[position] ?? 0;
    }

    compareWith(other: RacePositionMapping): number
    {
        const searchToPosition = Math.max(this.getLowestPosition(), other.getLowestPosition());

        for (let position = 1; position <= searchToPosition; position++) {
            const currentValue = this.getOccurencesInPosition(position);
            const otherValue = other.getOccurencesInPosition(position);
            if (currentValue !== otherValue) {
                return otherValue - currentValue;
            }
        }

        return 0;
    }

    compareWithLookingForBestResult(other: RacePositionMapping, remainingCountingRaces: number): number
    {
        for (let position = 1; position <= 100; position++) {
            const currentValue = this.getOccurencesInPosition(position) + (position === 1 ? remainingCountingRaces : 0);
            const otherValue = other.getOccurencesInPosition(position) + (position === 100 ? remainingCountingRaces : 0);
            if (currentValue !== otherValue) {
                return otherValue - currentValue;
            }
        }

        return 0;
    }

    compareWithLookingForWorstResult(other: RacePositionMapping, remainingCountingRaces: number): number
    {
        for (let position = 1; position <= 100; position++) {
            const currentValue = this.getOccurencesInPosition(position) + (position === 100 ? remainingCountingRaces : 0);
            const otherValue = other.getOccurencesInPosition(position) + (position === 1 ? remainingCountingRaces : 0);
            if (currentValue !== otherValue) {
                return otherValue - currentValue;
            }
        }

        return 0;
    }
}