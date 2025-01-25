import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../shared/ui/card.component';
import { StatCardComponent } from '../shared/ui/stat-card.component';
import { LucideAngularModule } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../shared/ui/button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    StatCardComponent,
    LucideAngularModule,
    RouterModule,
    ButtonComponent
  ],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-dark-900">Dashboard</h1>
        <app-button routerLink="/settings">
          <i-lucide name="settings" class="h-4 w-4 mr-2" />
          Einstellungen
        </app-button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <app-stat-card 
          title="Medien" 
          [value]="mediaCount" 
          icon="film"
        ></app-stat-card>
        
        <app-stat-card 
          title="Benutzer" 
          [value]="userCount" 
          icon="users"
        ></app-stat-card>
        
        <app-stat-card 
          title="Admin" 
          [value]="adminCount" 
          icon="shield"
        ></app-stat-card>
      </div>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <app-card title="Letzte Medien">
          <!-- Medien Liste -->
        </app-card>

        <app-card title="Systemstatus">
          <!-- System Status -->
        </app-card>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DashboardComponent {
  mediaCount = 42;
  userCount = 10;
  adminCount = 2;
} 