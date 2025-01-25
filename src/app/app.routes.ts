import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'media',
        loadComponent: () => import('./media/pages/media-list/media-list.component')
          .then(m => m.MediaListComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/pages/settings/settings.component')
          .then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
