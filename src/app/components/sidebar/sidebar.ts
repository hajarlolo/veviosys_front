import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LogoutModalComponent } from '../logout-modal/logout-modal';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoutModalComponent],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  showLogoutModal = false;

  constructor(private authService: AuthService, private router: Router) {}

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  onLogoutConfirmed(): void {
    this.showLogoutModal = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onLogoutCancelled(): void {
    this.showLogoutModal = false;
  }
}