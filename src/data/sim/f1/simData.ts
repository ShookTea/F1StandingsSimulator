import { Season } from '@/data/sim/f1/simDataTypes';

// @ts-ignore
import data2021 from './2021.data';
// @ts-ignore
import data2022 from './2022.data';
// @ts-ignore
import data2023 from './2023.data';
import { SportData } from '@/data/sim/data';
import FormulaPageView from '@/components/formula/FormulaPageView.vue';


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
