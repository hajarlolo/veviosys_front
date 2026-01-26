import { Technology } from './technology.model';
export interface Offer {
  id?: number;
  nom: string;
  description: string;
  prix: number;
  dureeMois: number;
  populaire: boolean;
  technologies?: Technology[]; 
}