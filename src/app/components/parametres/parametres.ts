import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametres.html',
  styleUrl: './parametres.css'
})

export class ParametresComponent implements OnInit {
  activeTab = 'privileges';

  // Privileges/Groupes Tab Data
  selectedGroupe: string = '';
  selectedPrivilege: string = '';
  selectedUtilisateur: string = '';

  groupes: any[] = [];
  privileges: any[] = [];
  utilisateurs: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Load sub-lists (mocked)
    this.authService.getAllUsers().subscribe(users => {
      this.utilisateurs = users;
    });

    // Mock Groupe/Privilege data
    this.groupes = [
      { id: 1, libelle: 'Administrateurs' },
      { id: 2, libelle: 'Utilisateurs' }
    ];

    this.privileges = [
      { id: 1, libelle: 'Lecture' },
      { id: 2, libelle: 'Ecriture' }
    ];
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Groupes Methods
  ajouterGroupe(): void {
    if (this.selectedGroupe) {
      console.log('Ajouter groupe:', this.selectedGroupe);
      this.selectedGroupe = '';
    }
  }

  modifierGroupe(groupe: any): void {
    console.log('Modifier groupe:', groupe);
  }

  supprimerGroupe(id: number): void {
    this.groupes = this.groupes.filter(g => g.id !== id);
    console.log('Groupe supprimé:', id);
  }

  // Privileges Methods
  ajouterPrivilege(): void {
    if (this.selectedPrivilege) {
      console.log('Ajouter privilege:', this.selectedPrivilege);
      this.selectedPrivilege = '';
    }
  }

  modifierPrivilege(privilege: any): void {
    console.log('Modifier privilege:', privilege);
  }

  supprimerPrivilege(id: number): void {
    this.privileges = this.privileges.filter(p => p.id !== id);
    console.log('Privilege supprimé:', id);
  }

  // Utilisateur Methods
  ajouterUtilisateur(): void {
    if (this.selectedUtilisateur) {
      console.log('Ajouter utilisateur:', this.selectedUtilisateur);
      this.selectedUtilisateur = '';
    }
  }

  sauvoirPlus(user: any): void {
    console.log('Savoir plus:', user);
  }

  supprimerUtilisateur(id: number): void {
    this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
    console.log('Utilisateur supprimé:', id);
  }

  modifierUtilisateurs(): void {
    console.log('Modifier utilisateurs');
  }

  supprimerUtilisateurs(): void {
    console.log('Supprimer utilisateurs');
  }
}
