import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ClientListComponent } from './components/client-list/client-list';
import { TechnologiesComponent } from './components/technologies/technologies';
import { ProprietesComponent } from './components/proprietes/proprietes';
import { OffresComponent } from './components/offres/offres';
import { AbonnementsComponent } from './components/abonnements/abonnements';
import { ParametresComponent } from './components/parametres/parametres';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'technologies', component: TechnologiesComponent },
  { path: 'proprietes', component: ProprietesComponent },
  { path: 'offres', component: OffresComponent },
  { path: 'abonnements', component: AbonnementsComponent },
  { path: 'parametres', component: ParametresComponent },
];