import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center">
        <div class="flex-1">
          <h3 class="text-sm font-medium text-dark-500">{{ title }}</h3>
          <div class="mt-2 flex items-baseline">
            <p class="text-2xl font-semibold text-dark-900">{{ value }}</p>
          </div>
        </div>
        <div class="p-2 bg-primary-50 rounded-lg">
          <lucide-icon 
            [name]="icon" 
            class="w-6 h-6 text-primary-600"
          ></lucide-icon>
        </div>
      </div>
    </div>
  `
})
export class StatCardComponent {
  @Input() title = '';
  @Input() value: number = 0;
  @Input() icon = '';
} 