import { F1Data, F2Data } from '@/data/sim/f1/simData';


export interface SeasonData<T> {
    data: T
    label: string
    routePart: string
}

export interface SportData<T> {
    data: SeasonData<T>[]
    label: string
    routePart: string
}

const allData: SportData<any>[] = [ F1Data, F2Data ];

export default allData;
