import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { MessengerComponent } from './messenger/messenger';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'messenger', component: MessengerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];