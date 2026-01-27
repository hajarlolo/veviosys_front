import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  token: string | null = null;
  step: 'request' | 'reset' = 'request'; // 'request' = forgot password form, 'reset' = reset password form
  message: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Check if there's a reset token in the URL
    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.token = params['token'];
        this.step = 'reset';
        console.log('Reset token found:', this.token);
      }
    });
  }

  // Step 1: Request password reset via email
  requestPasswordReset(): void {
    this.errorMessage = '';
    this.message = '';

    if (!this.email.trim()) {
      this.errorMessage = 'Veuillez entrer votre email';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Veuillez entrer un email valide';
      return;
    }

    this.loading = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.message = 'Email de réinitialisation envoyé! Vérifiez votre boîte mail.';
        this.email = '';
        this.loading = false;
        // Optionally redirect after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Erreur lors de l\'envoi de l\'email';
        this.loading = false;
        console.error('Forgot password error:', err);
      }
    });
  }

  // Step 2: Reset password with token
  resetPassword(): void {
    this.errorMessage = '';
    this.message = '';

    if (!this.newPassword.trim()) {
      this.errorMessage = 'Veuillez entrer le nouveau mot de passe';
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (!this.token) {
      this.errorMessage = 'Token invalide. Veuillez recommencer.';
      return;
    }

    this.loading = true;
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (res) => {
        this.message = 'Mot de passe réinitialisé avec succès! Redirection vers la connexion...';
        this.newPassword = '';
        this.confirmPassword = '';
        this.loading = false;
        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Erreur lors de la réinitialisation du mot de passe';
        this.loading = false;
        console.error('Reset password error:', err);
      }
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
