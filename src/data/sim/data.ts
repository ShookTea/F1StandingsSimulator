import { F1Data, F2Data } from '@/data/sim/f1/simData';

export interface SportData<T> {
    data: {
        [index: string]: T
    }
    label: string
    routePart: string
}

export default [
    F1Data,
    F2Data,
];
