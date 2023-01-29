import { Season } from '@/data/sim/f1/simDataTypes';
import { SportData } from '@/data/sim/data';
import FormulaPageView from '@/components/formula/FormulaPageView.vue';

import data2018 from './2018.json';
import data2019 from './2019.json';
import data2020 from './2020.json';
import data2021 from './2021.json';
import data2022 from './2022.json';
import data2023 from './2023.json';

export const F1Data: SportData<Season> = {
    data: [{
        data: data2023,
        label: 'Season 2023',
        routePart: '2023',
    }, {
        data: data2022,
        label: 'Season 2022',
        routePart: '2022',
    }, {
        data: data2021,
        label: 'Season 2021',
        routePart: '2021',
    }, {
        data: data2020,
        label: 'Season 2020',
        routePart: '2020',
    }, {
        data: data2019,
        label: 'Season 2019',
        routePart: '2019',
    }, {
        data: data2018,
        label: 'Season 2018',
        routePart: '2018'
    }],
    routePart: 'f1',
    label: 'Formula 1',
    routeParameters: [{
        key: 'step',
        defaultValue: 1
    }],
    component: FormulaPageView,
    showInMenu: true,
}
