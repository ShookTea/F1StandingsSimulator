import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';

import allData from '@/data/sim/data';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: `/${allData[0].routePart}`
    }
];

for (const entry of allData) {
    routes.push({
        path: `/${entry.routePart}`,
        redirect: `${entry.routePart}/${entry.data[0].routePart}`,
    });

    for (const data of entry.data) {
        routes.push({
            path: `/${entry.routePart}/${data.routePart}`,
            component: entry.component,
            meta: {
                sport: entry.routePart,
                season: data.routePart,
            }
        })
    }
}

routes.push({
    path: '/:notFoundMatch(.*)',
    redirect: '/'
})

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;