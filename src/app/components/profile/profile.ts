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

        const userToUpdate = {

            ...this.userData,

            password: this.userData.motDePasse, // Map motDePasse to password for backend

            profil: this.userData.profil // On mappe 'photo' vers 'profil'



        };



        if (this.userData.id) {

            this.authService.updateUser(this.userData.id, userToUpdate).subscribe({

                next: (res) => {

                    console.log('Profile updated successfully:', res);

                    alert('Profil mis à jour avec succès !');

                },

                error: (err) => {

                    console.error('Error updating profile:', err);

                    alert('Erreur lors de la mise à jour du profil.');

                }

            });

        }

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



    // Dans profile.ts et header.ts

    getPhotoUrl(path: any, name?: string): string {

        return this.authService.getPhotoUrl(path, name);

    }

}

