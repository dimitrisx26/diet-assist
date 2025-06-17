import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { devOnlyGuard } from './app/pages/guard/devonlyguard.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { 
                path: 'demo', 
                loadChildren: () => import('./app/pages/uikit/uikit.routes'),
                canActivate: [devOnlyGuard]
            },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'users', component: Dashboard},
            { path: 'messages', component: Dashboard},
            { path: 'meal-planner', component: Dashboard },
            { path: 'nutrition-tracker', component: Dashboard },
            { path: 'recipes', component: Dashboard },
            { path: 'food-database', component: Dashboard },
            { path: 'profile', component: Dashboard },
            { path: 'preferences', component: Dashboard }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
