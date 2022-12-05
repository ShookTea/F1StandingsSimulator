import { F1Data } from '@/data/sim/f1/simData';
import { FormulaDriverData } from '@/data/sim/formulaDrivers/simData';
import { Component } from 'vue';

export interface GroupData<T> {
    data: T
    label: string
    routePart: string
}

export interface RouterParameter {
    key: string
    defaultValue: number
}

export interface SportData<T> {
    data: GroupData<T>[]
    label: string
    routePart: string
    routeParameters: RouterParameter[]
    component: Component
    showInMenu: boolean
}

const allData: SportData<any>[] = [
    F1Data,
    FormulaDriverData,
];

export default allData;
