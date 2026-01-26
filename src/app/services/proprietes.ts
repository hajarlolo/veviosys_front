import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propriete } from '../models/propriete.model';

@Injectable({
  providedIn: 'root'
})
export class ProprietesService {

  private apiServerUrl = 'http://localhost:8080/api/proprietes';

  constructor(private http: HttpClient) { }

  // Get all proprietes
  public getProprietes(): Observable<Propriete[]> {
    return this.http.get<Propriete[]>(`${this.apiServerUrl}/all`);
  }

  // Create a propriete
  public createPropriete(propriete: Propriete): Observable<Propriete> {
    return this.http.post<Propriete>(`${this.apiServerUrl}/add`, propriete);
  }

  // Get propriete by ID
  public getProprieteById(proprieteId: number): Observable<Propriete> {
    return this.http.get<Propriete>(`${this.apiServerUrl}/find/${proprieteId}`);
  }

  // Update a propriete
  public updatePropriete(proprieteId: number, propriete: Propriete): Observable<Propriete> {
    return this.http.put<Propriete>(`${this.apiServerUrl}/update/${proprieteId}`, propriete);
  }

  // Delete a propriete
  public deletePropriete(proprieteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${proprieteId}`);
  }
}
