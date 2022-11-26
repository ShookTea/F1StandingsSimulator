import { F1Data } from '@/data/sim/f1/simData';
import { Component } from 'vue';


export interface SeasonData<T> {
    data: T
    label: string
    routePart: string
}

export interface RouterParameter {
    key: string
    defaultValue: number
}

export interface SportData<T> {
    data: SeasonData<T>[]
    label: string
    routePart: string
    routeParameters: RouterParameter[]
    component: Component
}

const allData: SportData<any>[] = [ F1Data ];

export default allData;
