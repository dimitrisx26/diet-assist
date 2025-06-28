import { Routes } from '@angular/router';

export default [
  { path: 'dashboard', loadComponent: () => import('../pages/admin/dashboard/dashboard').then((m) => m.Dashboard) },
  { path: 'users', loadComponent: () => import('../pages/admin/users-list/users-list').then((m) => m.UsersList) },
  { path: 'user/:id', loadComponent: () => import('../pages/shared/user-details/user-details').then((m) => m.UserDetailsComponent) },
  { path: 'meal-plan-templates', loadComponent: () => import('../pages/admin/meal-plan-templates/meal-plan-templates').then((m) => m.MealPlanTemplatesComponent) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
] as Routes;
