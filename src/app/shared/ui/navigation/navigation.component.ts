import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <nav class="bg-white shadow">
      <div class="mx-auto px-4">
        <div class="flex h-16 justify-between">
          <!-- Linke Seite - Logo & Hauptnavigation -->
          <div class="flex">
            <div class="flex items-center">
              <a routerLink="/" class="text-xl font-bold text-dark-900">
                Media Center
              </a>
            </div>
            
            <div class="ml-10 flex items-center space-x-4">
              <a *ngFor="let item of navigationItems"
                 [routerLink]="item.route"
                 routerLinkActive="text-primary-600"
                 class="px-3 py-2 text-sm font-medium text-dark-600 hover:text-dark-900 flex items-center gap-2"
              >
                <i-lucide [name]="item.icon" class="h-4 w-4" />
                {{ item.label }}
              </a>
            </div>
          </div>

          <!-- Rechte Seite - Benutzermenü -->
          <div class="flex items-center">
            <button
              (click)="logout()"
              class="px-3 py-2 text-sm font-medium text-dark-600 hover:text-dark-900 flex items-center gap-2"
            >
              <i-lucide name="log-out" class="h-4 w-4" />
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavigationComponent {
  navigationItems = [
    {
      icon: 'home',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'film',
      label: 'Medien',
      route: '/media'
    },
    {
      icon: 'settings',
      label: 'Einstellungen',
      route: '/settings'
    }
  ];

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
} 