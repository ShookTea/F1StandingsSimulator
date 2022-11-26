import SimulationView from '@/components/SimulationView.vue';
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/f1',
    },
    {
        path: '/f1',
        component: SimulationView,
    }
];

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;