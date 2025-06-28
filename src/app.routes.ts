import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Landing } from './app/pages/shared/landing/landing';
import { Notfound } from './app/pages/shared/notfound/notfound';
import { authGuard } from './app/pages/guard/auth.guard';
import { devOnlyGuard } from './app/pages/guard/devonlyguard.guard';

export const appRoutes: Routes = [
  // Public routes
  { path: 'landing', component: Landing },
  { path: 'auth', loadChildren: () => import('./app/routes/auth.routes') },

  // Protected application routes
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

      // Admin routes
      { path: 'admin', loadChildren: () => import('./app/routes/admin.routes') },

      // Client/User routes
      { path: 'dashboard', loadComponent: () => import('./app/pages/admin/dashboard/dashboard').then((m) => m.Dashboard) },
      { path: 'meal-planner', loadComponent: () => import('./app/pages/admin/dashboard/dashboard').then((m) => m.Dashboard) }, // TODO: Replace with actual component
      { path: 'nutrition-tracker', loadComponent: () => import('./app/pages/admin/dashboard/dashboard').then((m) => m.Dashboard) }, // TODO: Replace with actual component
      { path: 'recipes', loadComponent: () => import('./app/pages/admin/dashboard/dashboard').then((m) => m.Dashboard) }, // TODO: Replace with actual component
      { path: 'food-database', loadComponent: () => import('./app/pages/admin/dashboard/dashboard').then((m) => m.Dashboard) }, // TODO: Replace with actual component
      { path: 'profile/:id', loadComponent: () => import('./app/pages/shared/user-details/user-details').then((m) => m.UserDetailsComponent) },
      { path: 'preferences', loadComponent: () => import('./app/pages/admin/dashboard/dashboard').then((m) => m.Dashboard) }, // TODO: Replace with actual component
      { path: 'messages', loadComponent: () => import('./app/pages/admin/dashboard/dashboard').then((m) => m.Dashboard) }, // TODO: Replace with actual component

      // Development/Demo routes (only available in dev mode)
      {
        path: 'demo',
        loadChildren: () => import('./app/routes/demo.routes'),
        canActivate: [devOnlyGuard]
      }
    ]
  },

  // Error routes
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' }
];
