import { Routes } from '@angular/router';
import { Login } from './login/login';
import { MessengerLayout } from './messenger-layout/messenger-layout';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'messenger', component: MessengerLayout },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
