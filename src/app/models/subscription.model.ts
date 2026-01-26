import { Client } from './client.model';
import { Offer } from './offer.model';

export interface Subscription {
  id?: number;
  client?: Client;
  offer?: Offer;
  dateDebut: string;
  dateFin: string;
  prix: number;
  statut: string;
}
