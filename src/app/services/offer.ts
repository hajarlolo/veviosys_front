import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private apiServerUrl = 'http://localhost:8080/api/offers';

  constructor(private http: HttpClient) { }

  // Get all offers
  public getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiServerUrl}/all`);
  }

  // Create an offer
  public createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiServerUrl}`, offer);
  }

  // Get offer by ID
  public getOfferById(offerId: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiServerUrl}/find/${offerId}`);
  }

  // Update an offer
  public updateOffer(offerId: number, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiServerUrl}/${offerId}`, offer);
  }

  // Delete an offer
  public deleteOffer(offerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${offerId}`);
  }
}
