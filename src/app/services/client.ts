import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model'; // Import your interface
@Injectable({
  providedIn: 'root'
})

export class ClientService {
  // Base URL from your test
  private apiServerUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  // FIX: Removed "/all" because your test shows data is at the root
  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiServerUrl);
  }

  // Double-check with Douae if her POST is really at /add or just the root
  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerUrl}`, client);
  }

  public createClient(client: Client): Observable<Client> {
    return this.addClient(client);
  }

  public updateClient(clientId: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiServerUrl}/${clientId}`, client);
  }

  // If her GET is at /api/clients/1, change this to `${this.apiServerUrl}/${clientId}`
  public getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiServerUrl}/${clientId}`);
  }

  public deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${clientId}`);
  }
}