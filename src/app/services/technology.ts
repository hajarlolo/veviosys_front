import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technology } from '../models/technology.model';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private apiServerUrl = 'http://localhost:8080/api/technologies';

  constructor(private http: HttpClient) { }

  // Get all technologies
  public getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.apiServerUrl}/all`);
  }

  // Create a technology
  public createTechnology(technology: Technology): Observable<Technology> {
    return this.http.post<Technology>(`${this.apiServerUrl}`, technology);
  }

  // Get technology by ID
  public getTechnologyById(technologyId: number): Observable<Technology> {
    return this.http.get<Technology>(`${this.apiServerUrl}/find/${technologyId}`);
  }

  // Update a technology
  public updateTechnology(technologyId: number, technology: Technology): Observable<Technology> {
    return this.http.put<Technology>(`${this.apiServerUrl}/${technologyId}`, technology);
  }

  // Delete a technology
  public deleteTechnology(technologyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${technologyId}`);
  }
}
