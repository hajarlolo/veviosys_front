export interface Client {
  id?: number;
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  pays?: string;
  ville?: string;
  adresse?: string;
  profil?: string;
  createdAt?: string;
}