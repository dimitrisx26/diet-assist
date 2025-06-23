import { Routes } from '@angular/router';
import { UsersList } from './admin/users-list/users-list';
import { Empty } from './shared/empty/empty';
import { UserDetailsComponent } from './shared/user-details/user-details';

export default [
  { path: 'users', component: UsersList },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
