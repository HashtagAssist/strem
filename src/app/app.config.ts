import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from '../app/auth/interceptors/auth.interceptor';
import {
  LucideAngularModule, 
  ArrowUpRight, 
  File, 
  Folder,
  Home, 
  Menu, 
  UserCheck, 
  Film, 
  Users, 
  Shield, 
  LogOut, 
  Settings,
  X,
  ChevronRight,
  ChevronDown,
  Loader2
} from "lucide-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(LucideAngularModule.pick({
      File, 
      Folder,
      Home, 
      Menu, 
      UserCheck, 
      ArrowUpRight, 
      Film, 
      Users,
      Shield,
      LogOut,
      Settings,
      X,
      ChevronRight,
      ChevronDown,
      Loader2
    }))
  ]
};
