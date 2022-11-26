import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';

import allData from '@/data/sim/data';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: `/${allData[0].routePart}`
    }
];

for (const entry of allData) {
    if (entry.routeParameters.length === 0) {
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
    } else {
        const defaultsForRoot = entry.routeParameters.map(param => param.defaultValue).join('/');
        routes.push({
            path: `/${entry.routePart}`,
            redirect: `${entry.routePart}/${entry.data[0].routePart}/${defaultsForRoot}`,
        })

        for (const data of entry.data) {
            for (let i = 0; i < entry.routeParameters.length; i++) {
                let usedParameters = entry.routeParameters.slice(0, i).map(param => `:${param.key}`).join('/');
                if (usedParameters.length > 0) {
                    usedParameters = '/' + usedParameters;
                }
                let remainingDefaults = entry.routeParameters.slice(i).map(param => param.defaultValue).join('/');
                if (remainingDefaults.length > 0) {
                    remainingDefaults = '/' + remainingDefaults;
                }
                const path = `/${entry.routePart}/${data.routePart}${usedParameters}`;
                const redirect = `/${entry.routePart}/${data.routePart}${usedParameters}${remainingDefaults}`;

                routes.push({ path, redirect });
            }

            const parameters = entry.routeParameters.map(param => `:${param.key}`).join('/');

            routes.push({
                path: `/${entry.routePart}/${data.routePart}/${parameters}`,
                component: entry.component,
                meta: {
                    sport: entry.routePart,
                    season: data.routePart,
                }
            })
        }
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