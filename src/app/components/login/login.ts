import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // 🔹 important
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,             // 🔹 standalone
  imports: [CommonModule, FormsModule, RouterLink], // 🔹 Added RouterLink
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    // Clear previous error
    this.errorMessage = '';

    // Validate input
    if (!this.email.trim()) {
      this.errorMessage = 'Veuillez entrer votre email';
      return;
    }

    if (!this.password.trim()) {
      this.errorMessage = 'Veuillez entrer votre mot de passe';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Veuillez entrer un email valide';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error detail:', err);
        if (err.status === 0) {
          this.errorMessage = 'Erreur réseau : Le serveur est injoignable ou problème CORS';
        } else if (err.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else {
          this.errorMessage = `Erreur ${err.status} : ${err.message || 'Erreur serveur'}`;
        }
      }
    });
  }
}