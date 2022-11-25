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
}