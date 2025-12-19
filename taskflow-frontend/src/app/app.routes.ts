import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/pages/login/login.component')
  },
  {
    path: 'projects',
    children : [
      {
        path: '',
        loadComponent: () => import('./features/projects/pages/project-list/project-list.component')
      },
      {
        path: ':id',
        loadComponent: () => import('./features/projects/pages/project-detail/project-detail.component')
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];
