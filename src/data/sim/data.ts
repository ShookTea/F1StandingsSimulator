import { F1Data, F2Data } from '@/data/sim/f1/simData';
import { Component } from 'vue';


export interface SeasonData<T> {
    data: T
    label: string
    routePart: string
}

export interface SportData<T> {
    data: SeasonData<T>[]
    label: string
    routePart: string
    component: Component
}

const allData: SportData<any>[] = [ F1Data, F2Data ];

export default allData;
