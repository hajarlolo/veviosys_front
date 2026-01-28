
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client';
import { TechnologyService } from '../../services/technology';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  searchQuery: string = '';
  searchResults: any[] = [];
  showResults: boolean = false;

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private techService: TechnologyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  

  // Dans profile.ts et header.ts
  getPhotoUrl(path: any, name?: string): string {
    return this.authService.getPhotoUrl(path, name);
  }


  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  onResultClick(item: any): void {
    this.showResults = false;
    this.searchQuery = '';
    // Navigate based on type
    if (item.type === 'Client') this.router.navigate(['/clients']);
    else if (item.type === 'Technologie') this.router.navigate(['/technologies']);
    else if (item.type === 'Utilisateur') this.router.navigate(['/profile']);
  }
}
