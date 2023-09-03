import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./views/check-list/check-list.component')},
];
