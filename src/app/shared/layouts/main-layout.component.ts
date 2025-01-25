import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../ui/navigation/navigation.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-navigation />
      <main>
        <router-outlet />
      </main>
    </div>
  `
})
export class MainLayoutComponent {} 