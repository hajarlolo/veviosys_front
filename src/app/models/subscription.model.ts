export interface Subscription {
  id?: number;
  client: { id: number; nom?: string };
  offer: { id: number; nom?: string };
  dateDebut: Date;
  dateFin: Date;
  confirme: boolean;
  total: number;
  active: boolean;
  nbuser: number;
}
