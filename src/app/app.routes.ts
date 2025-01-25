import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../app/auth/guards/auth.guard';

export const routes: Routes = [
  // Umleitung von der Root-URL zum Dashboard
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  
  // Login-Route (lazy loaded)
  {
    path: 'login',
    loadComponent: () => import('../app/auth/pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  
  // Dashboard-Route (geschützt)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  
  // Media-Route (geschützt & lazy loaded)
  {
    path: 'media',
    loadComponent: () => import('../app/media/pages/media-list/media-list.component')
      .then(m => m.MediaListComponent),
    canActivate: [AuthGuard]
  },
  
  // Fallback für unbekannte Routen
  { 
    path: '**', 
    redirectTo: 'dashboard' 
  }
];
