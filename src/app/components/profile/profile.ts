import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';



@Component({

    selector: 'app-profile',

    standalone: true,

    imports: [CommonModule, FormsModule],

    templateUrl: './profile.html',

    styleUrl: './profile.css'

})

export class ProfileComponent implements OnInit {

    userData: any = {

        id: null,

        cin: '',

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



    constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { }



    ngOnInit(): void {

        this.authService.currentUser$.subscribe(user => {

            console.log('Initial user from local storage:', user);

            if (user && user.id) {

                this.authService.getUserById(user.id).subscribe({

                    next: (fullUserData) => {

                        console.log('Full user data from backend:', fullUserData);

                        this.userData = {

                            ...this.userData,

                            ...fullUserData,

                            motDePasse: fullUserData.motDePasse || fullUserData.password || this.userData.motDePasse,

                            photo: fullUserData.profil || this.userData.photo // Map backend 'profil' to frontend 'photo'

                        };

                        this.cdr.detectChanges(); // Force change detection

                        console.log('Updated userData in ProfileComponent:', this.userData);

                    },

                    error: (err) => {

                        console.error('Error fetching full user data:', err);

                    }

                });

            } else if (user) {

                // Fallback to local storage user if ID is not immediately available

                console.warn('User ID not found in initial user object, using partial local storage data.', user);

                this.userData = {

                    ...this.userData,

                    ...user,

                    motDePasse: user.motDePasse || user.password || this.userData.motDePasse

                };

            }

        });

    }


    updateProfile(): void {
        const formData = new FormData();
      
        formData.append('nom', this.userData.nom);
        formData.append('prenom', this.userData.prenom);
        formData.append('email', this.userData.email);
        formData.append('telephone', this.userData.telephone);
        formData.append('adresse', this.userData.adresse);
        formData.append('ville', this.userData.ville);
        formData.append('pays', this.userData.pays);
        formData.append('cin', this.userData.cin);
        formData.append('password', this.userData.motDePasse || '');
      
        if (this.userData.selectedFile) {
          formData.append('photo', this.userData.selectedFile);
        }
      
        this.authService.updateUser(this.userData.id, formData).subscribe({
          next: () => alert("Profil mis à jour ✅"),
          error: err => console.error("Erreur update", err)
        });
      }

      onPhotoSelected(event: any): void {
        const file = event.target.files[0];
        if (!file) return;
    
        this.userData.selectedFile = file;
    
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // preview côté frontend
            this.userData.photo = e.target.result; 
        };
        reader.readAsDataURL(file);
    }
      
      getPhotoUrl(filename: string) {
        if (!filename) return 'assets/default-profile.png';
        return `http://localhost:8080/uploads/users/${filename}`;
      }

}

