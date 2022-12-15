import { GroupData, SportData } from '@/data/sim/data';
import { Driver } from '@/data/sim/formulaDrivers/driverDataTypes';
import FormulaDriverPageView from '@/components/formulaDriver/FormulaDriverPageView.vue';
// @ts-ignore
import _drivers from './driver.data';
const drivers: Driver[] = _drivers;

const data: GroupData<Driver>[] = drivers.map(
  driver => ({
      data: driver,
      label: driver.driverDetails.fullName,
      routePart: driver.driverDetails.routePart,
  })
);

export const FormulaDriverData: SportData<Driver> = {
    data,
    routePart: 'formula-driver',
    label: 'Formula drivers',
    component: FormulaDriverPageView,
    routeParameters: [],
    showInMenu: false,
};
