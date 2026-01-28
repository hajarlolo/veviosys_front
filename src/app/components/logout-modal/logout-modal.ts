import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-modal.html',
  styleUrls: ['./logout-modal.css']
})
export class LogoutModalComponent {
  @Input() isOpen = false;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  onConfirm(): void {
    this.authService.logout().subscribe(() => {
      // Redirige vers login et recharge la page pour que le back ne fonctionne plus
      this.router.navigate(['/login']).then(() => window.location.reload());
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
