import { Routes } from '@angular/router';

export default [
  // Client-specific routes will go here
  // For now, redirect to dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
] as Routes;
