import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/ui/card.component';
import { ButtonComponent } from '../../../shared/ui/button.component';
import { InputComponent } from '../../../shared/ui/input.component';
import { MediaService } from '../../../media/services/media.service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

interface DirectoryNode {
  name: string;
  path: string;
  isDirectory: boolean;
  isExpanded?: boolean;
  children?: DirectoryNode[];
  isLoading?: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, InputComponent, FormsModule, LucideAngularModule],
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <h1 class="text-3xl font-bold text-dark-900 mb-6">Einstellungen</h1>
      
      <app-card>
        <h2 class="text-xl font-semibold mb-4">Medienbibliothek</h2>
        
        <div class="space-y-4">
          <div class="flex gap-4 items-end">
            <app-input
              id="mediaPath"
              label="Bibliothekspfad"
              [(ngModel)]="mediaPath"
              [readonly]="true"
              placeholder="/pfad/zur/medienbibliothek"
              class="flex-1"
            />
            <app-button
              variant="outline"
              (click)="showDirectoryBrowser = true"
            >
              Durchsuchen
            </app-button>
          </div>

          <!-- Directory Browser Dialog -->
          <div *ngIf="showDirectoryBrowser" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Verzeichnis auswählen</h3>
                <button 
                  (click)="showDirectoryBrowser = false"
                  class="text-dark-500 hover:text-dark-700"
                >
                  <i-lucide name="x" class="h-5 w-5" />
                </button>
              </div>

              <!-- Directory Tree -->
              <div class="border rounded-lg overflow-hidden mb-4">
                <div class="max-h-96 overflow-y-auto p-2">
                  <ng-container *ngTemplateOutlet="directoryTree; context: { $implicit: rootDirectory }">
                  </ng-container>
                </div>
              </div>

              <div class="flex justify-end gap-2">
                <app-button
                  variant="outline"
                  (click)="showDirectoryBrowser = false"
                >
                  Abbrechen
                </app-button>
                <app-button
                  (click)="selectCurrentPath()"
                  [disabled]="!selectedPath"
                >
                  Auswählen
                </app-button>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-4 border-t">
            <div>
              <h3 class="font-medium">Bibliothek scannen</h3>
              <p class="text-sm text-dark-500">
                Sucht nach neuen oder geänderten Mediendateien
              </p>
            </div>
            <app-button
              [loading]="scanning"
              [disabled]="!mediaPath"
              (click)="scanLibrary()"
            >
              Jetzt scannen
            </app-button>
          </div>
        </div>
      </app-card>
    </div>

    <!-- Directory Tree Template -->
    <ng-template #directoryTree let-node>
      <div *ngIf="node" class="directory-tree">
        <div 
          class="flex items-center gap-2 p-1 hover:bg-gray-50 cursor-pointer rounded"
          [class.bg-primary-50]="node.path === selectedPath"
          (click)="selectDirectory(node)"
        >
          <button 
            *ngIf="node.isDirectory"
            class="w-4 h-4 flex items-center justify-center text-dark-400"
            (click)="toggleDirectory(node, $event)"
          >
            <i-lucide
              [name]="node.isExpanded ? 'chevron-down' : 'chevron-right'"
              class="h-4 w-4"
            />
          </button>
          <i-lucide 
            [name]="node.isDirectory ? 'folder' : 'file'"
            class="h-4 w-4"
            [class.text-primary-500]="node.path === selectedPath"
            [class.text-dark-400]="node.path !== selectedPath"
          />
          <span 
            [class.font-medium]="node.path === selectedPath"
          >
            {{ node.name }}
          </span>
          <i-lucide
            *ngIf="node.isLoading"
            name="loader-2"
            class="h-4 w-4 animate-spin text-primary-500"
          />
        </div>
        
        <div *ngIf="node.isDirectory && node.isExpanded" class="ml-6">
          <ng-container *ngFor="let child of node.children">
            <ng-container *ngTemplateOutlet="directoryTree; context: { $implicit: child }">
            </ng-container>
          </ng-container>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .directory-tree {
      font-size: 0.875rem;
    }
  `]
})
export class SettingsComponent implements OnInit {
  mediaPath: string = '';
  scanning: boolean = false;
  showDirectoryBrowser: boolean = false;
  rootDirectory: DirectoryNode | null = null;
  selectedPath: string | null = null;

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.initializeRootDirectory();
  }

  async initializeRootDirectory() {
    this.rootDirectory = {
      name: '/',
      path: '/',
      isDirectory: true,
      isExpanded: true,
      children: []
    };
    await this.loadDirectoryContent(this.rootDirectory);
  }

  async loadDirectoryContent(node: DirectoryNode) {
    if (!node.isDirectory) return;
    
    node.isLoading = true;
    try {
      const entries = await this.mediaService.listDirectory(node.path);
      node.children = entries
        .filter(entry => entry.isDirectory) // Nur Verzeichnisse anzeigen
        .map(entry => ({
          name: entry.name,
          path: entry.path,
          isDirectory: entry.isDirectory,
          children: [],
          isExpanded: false
        }));
    } catch (error) {
      console.error('Fehler beim Laden des Verzeichnisses:', error);
    } finally {
      node.isLoading = false;
    }
  }

  async toggleDirectory(node: DirectoryNode, event: Event) {
    event.stopPropagation();
    if (node.isDirectory) {
      if (!node.isExpanded && (!node.children || node.children.length === 0)) {
        await this.loadDirectoryContent(node);
      }
      node.isExpanded = !node.isExpanded;
    }
  }

  selectDirectory(node: DirectoryNode) {
    if (node.isDirectory) {
      this.selectedPath = node.path;
    }
  }

  selectCurrentPath() {
    if (this.selectedPath) {
      this.mediaPath = this.selectedPath;
      this.showDirectoryBrowser = false;
    }
  }

  async scanLibrary() {
    if (!this.mediaPath) {
      alert('Bitte wählen Sie zuerst einen Bibliothekspfad aus.');
      return;
    }

    this.scanning = true;
    try {
      await this.mediaService.initializeScan(this.mediaPath);
      alert('Scan erfolgreich gestartet!');
    } catch (error) {
      alert('Fehler beim Scannen der Bibliothek');
      console.error(error);
    } finally {
      this.scanning = false;
    }
  }
} 