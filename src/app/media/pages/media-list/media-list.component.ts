import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/ui/card.component';
import { ButtonComponent } from '../../../shared/ui/button.component';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-dark-900">Medien</h1>
        <app-button>Neu hinzufügen</app-button>
      </div>

      <app-card>
        <div class="divide-y divide-gray-200">
          <div *ngFor="let media of mediaList" class="py-4 flex items-center justify-between">
            <div>
              <h4 class="text-lg font-medium text-dark-900">{{ media.title }}</h4>
              <p class="text-sm text-dark-500">{{ media.type }}</p>
            </div>
            <div class="flex gap-2">
              <app-button variant="outline">Bearbeiten</app-button>
              <app-button variant="outline">Löschen</app-button>
            </div>
          </div>
        </div>
      </app-card>
    </div>
  `
})
export class MediaListComponent implements OnInit {
  mediaList = [
    { id: 1, title: 'Sample Media 1', type: 'Video' },
    { id: 2, title: 'Sample Media 2', type: 'Audio' },
    // Weitere Beispieldaten...
  ];

  ngOnInit() {
    // Hier später die Medien vom Backend laden
  }
} 