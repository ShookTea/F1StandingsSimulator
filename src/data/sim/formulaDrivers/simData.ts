import { SportData } from '@/data/sim/data';
import { Driver } from '@/data/sim/formulaDrivers/driverDataTypes';
import FormulaDriverPageView from '@/components/formulaDriver/FormulaDriverPageView.vue';
// @ts-ignore
import drivers from './driver.data';

export const FormulaDriverData: SportData<Driver> = {
    data: [{
        data: drivers,
        label: 'Some data label',
        routePart: 'foobar',
    }],
    routePart: 'formula-driver',
    label: 'Formula drivers',
    component: FormulaDriverPageView,
    routeParameters: [],
    showInMenu: false,
};
