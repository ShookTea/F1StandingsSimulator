import { Season } from '@/data/sim/f1/simDataTypes';

// @ts-ignore
import data2021 from './2021.data';
// @ts-ignore
import data2022 from './2022.data';
// @ts-ignore
import data2023 from './2023.data';
import { SportData } from '@/data/sim/data';
import FormulaPageView from '@/components/formula/FormulaPageView.vue';

interface F1SimulationData {
    2021: Season
    2022: Season
    2023: Season
}

const allYears: F1SimulationData = {
    2021: data2021,
    2022: data2022,
    2023: data2023,
}

export const F1Data: SportData<Season> = {
    data: [{
        data: data2023,
        label: 'Season 2023',
        routePart: '2023',
    }, {
        data: data2022,
        label: 'Season 2022',
        routePart: '2022',
    }],
    routePart: 'f1',
    label: 'Formula 1',
    routeParameters: [{
        key: 'step',
        defaultValue: 1
    }],
    component: FormulaPageView,
}

export const F2Data: SportData<Season> = {
    data: [{
        data: data2021,
        label: 'Season 2021',
        routePart: '2021',
    }],
    routePart: 'f2',
    label: 'Formula 2',
    routeParameters: [{
        key: 'step',
        defaultValue: 1
    }],
    component: FormulaPageView,
}

export const availableYears = Object.keys(allYears).sort();

export default allYears;
export const newestYear = availableYears[availableYears.length - 1];
