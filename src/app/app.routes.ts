import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ClientListComponent } from './components/client-list/client-list';
import { TechnologiesComponent } from './components/technologies/technologies';
import { ProprietesComponent } from './components/proprietes/proprietes';
import { OffresComponent } from './components/offres/offres';
import { AbonnementsComponent } from './components/abonnements/abonnements';
import { ParametresComponent } from './components/parametres/parametres';
import { AuthGuardService } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'clients', component: ClientListComponent, canActivate: [AuthGuardService] },
  { path: 'technologies', component: TechnologiesComponent, canActivate: [AuthGuardService] },
  { path: 'proprietes', component: ProprietesComponent, canActivate: [AuthGuardService] },
  { path: 'offres', component: OffresComponent, canActivate: [AuthGuardService] },
  { path: 'abonnements', component: AbonnementsComponent, canActivate: [AuthGuardService] },
  { path: 'parametres', component: ParametresComponent, canActivate: [AuthGuardService] },
];