export interface Subscription {
  id?: number;
  client: { id: number; nom?: string };
  offer: { id: number; nom?: string };
  dateDebut: string;
  dateFin: string;
  confirme: boolean;
  total: number;
  active: boolean;
}
