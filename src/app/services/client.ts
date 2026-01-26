import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model'; // Import your interface
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiServerUrl = 'http://localhost:8080/api/clients'; // Change this to match Douae's controller path

  constructor(private http: HttpClient) { }

  // Get all clients
  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}/all`);
  }

  // Add a client
  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerUrl}/add`, client);
  }

  // Find client by ID (useful for the Profile page in Figma)
  public getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiServerUrl}/find/${clientId}`);
  }

  // Delete client
  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${clientId}`);
  }
}