import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface DirectoryEntry {
  name: string;
  path: string;
  isDirectory: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = `${environment.apiUrl}/media`;

  constructor(private http: HttpClient) {}

  async initializeScan(path: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/scan`, { path })
    );
  }

  async testPath(path: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/test-path`, { path })
    );
  }

  async listDirectory(path: string): Promise<DirectoryEntry[]> {
    return firstValueFrom(
      this.http.post<DirectoryEntry[]>(`${this.apiUrl}/list-directory`, { path })
    );
  }
} 