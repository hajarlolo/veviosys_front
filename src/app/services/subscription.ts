import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiServerUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) { }

  // Get all subscriptions
  public getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiServerUrl}/all`);
  }

  // Create a subscription
  public createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiServerUrl}`, subscription);
  }

  // Get subscription by ID
  public getSubscriptionById(subscriptionId: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiServerUrl}/find/${subscriptionId}`);
  }

  // Update a subscription
  public updateSubscription(subscriptionId: number, subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiServerUrl}/${subscriptionId}`, subscription);
  }

  // Delete a subscription
  public deleteSubscription(subscriptionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${subscriptionId}`);
  }
}
