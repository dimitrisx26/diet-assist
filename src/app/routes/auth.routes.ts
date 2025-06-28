import { Routes } from '@angular/router';

export default [
  { path: 'login', loadComponent: () => import('../pages/shared/auth/login').then((m) => m.Login) },
  { path: 'signup', loadComponent: () => import('../pages/shared/auth/signup').then((m) => m.SignUp) },
  { path: 'access', loadComponent: () => import('../pages/shared/auth/access').then((m) => m.Access) },
  { path: 'error', loadComponent: () => import('../pages/shared/auth/error').then((m) => m.Error) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
] as Routes;
