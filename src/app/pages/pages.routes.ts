import { Routes } from '@angular/router';
import { UsersList } from './admin/users-list/users-list';
import { Empty } from './shared/empty/empty';
import { UserDetailsComponent } from './shared/user-details/user-details';

export default [
  { path: 'users', component: UsersList },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'meal-plan-templates', loadComponent: () => import('../pages/admin/meal-plan-templates/meal-plan-templates').then((m) => m.MealPlanTemplatesComponent) },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
