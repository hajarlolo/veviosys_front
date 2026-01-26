import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoutModalComponent } from '../logout-modal/logout-modal';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoutModalComponent],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  showLogoutModal = false;

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  onLogoutConfirmed(): void {
    this.showLogoutModal = false;
    console.log('Logging out...');
    // Add logout logic here
  }

  onLogoutCancelled(): void {
    this.showLogoutModal = false;
  }
}