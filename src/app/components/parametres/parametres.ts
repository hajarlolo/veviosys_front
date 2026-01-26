import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parametres.html',
  styleUrl: './parametres.css'
})
export class ParametresComponent implements OnInit {
  activeTab = 'compte';

  userData = {
    cin: 'BB123456',
    nom: '',
    prenom: '',
    adresse: '',
    ville: '',
    pays: '',
    email: '',
    telephone: '',
    motDePasse: '',
    photo: ''
  };

  // Privileges/Groupes Tab Data
  selectedGroupe: string = '';
  selectedPrivilege: string = '';
  selectedUtilisateur: string = '';

  groupes = [
    { id: 1, libelle: 'Admin' },
    { id: 2, libelle: 'User' }
  ];

  privileges = [
    { id: 1, libelle: 'Admin' },
    { id: 2, libelle: 'User' }
  ];

  utilisateurs = [
    { id: 1, nom: 'Noura Hida' },
    { id: 2, nom: 'Khadija Outalib' }
  ];

  constructor() {}

  ngOnInit(): void {
    // Load user data
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  updateProfile(): void {
    console.log('Profile updated:', this.userData);
  }

  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userData.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
