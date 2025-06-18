import { Routes } from '@angular/router';
import { UsersList } from './admin/users-list/users-list';
import { Empty } from './shared/empty/empty';

export default [
  { path: 'users-list', component: UsersList },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
