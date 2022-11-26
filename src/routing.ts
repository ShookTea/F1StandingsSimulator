import SimulationView from '@/components/SimulationView.vue';
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';
import { newestYear } from '@/data/sim/simData';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/f1',
    }, {
        path: '/f1',
        redirect: `/f1/${newestYear}`,
    }, {
        path: '/f1/:year(\\d{4})',
        redirect: to => `/f1/${to.params.year}/1`
    }, {
        path: '/f1/:year(\\d{4})/:step(\\d+)',
        component: SimulationView,
    }
];

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;