
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from '../../services/offer';
import { TechnologyService } from '../../services/technology';
import { SubscriptionService } from '../../services/subscription';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  mostUsedTech: string = '';
  mostFollowedOffer: string = '';
  totalOffers: number = 0;

  offres: any[] = [];
  techs: any[] = [];
  subscriptions: any[] = [];

  showTechnologyModal: boolean = false;
  selectedTechnology: any = null;

  constructor(
    private offerService: OfferService,
    private technologyService: TechnologyService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService, // Inject AuthService
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  getPhotoUrl(path: any, name: string): string {
    return this.authService.getPhotoUrl(path, name);
  }

  openTechnologyModal(tech: any): void {
    this.selectedTechnology = tech;
    this.showTechnologyModal = true;
  }

  closeTechnologyModal(): void {
    this.showTechnologyModal = false;
    this.selectedTechnology = null;
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    // 1. Fetch Offers
    this.offerService.getOffers().subscribe(data => {
      this.offres = data;
      this.totalOffers = data.length;

      this.calculateMostFollowedOffer();
    }, error => {
      console.error('Error fetching offers:', error);
    });

    // 2. Fetch Technologies
    this.technologyService.getTechnologies().subscribe(data => {
      this.techs = data;
      this.calculateMostUsedTech();
    }, error => {
      console.error('Error fetching technologies:', error);
    });

    // 3. Fetch Subscriptions for analytics
    this.subscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = data;
      this.calculateMostFollowedOffer(); // Need subscriptions to calc this
      this.calculateMostUsedTech();      // Need subscriptions too
      this.cdr.detectChanges(); // Force change detection after all data is loaded
    }, error => {
      console.error('Error fetching subscriptions:', error);
    });
  }

  calculateMostFollowedOffer(): void {
    if (!this.subscriptions.length || !this.offres.length) return;

    const offerCounts: { [key: string]: number } = {};
    this.subscriptions.forEach(sub => {
      if (sub.offer && sub.offer.nom) {
        offerCounts[sub.offer.nom] = (offerCounts[sub.offer.nom] || 0) + 1;
      }
    });

    let maxCount = 0;
    let mostFollowed = '';
    for (const [offerName, count] of Object.entries(offerCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostFollowed = offerName;
      }
    }
    this.mostFollowedOffer = mostFollowed || 'Aucune Donnée';
  }

  calculateMostUsedTech(): void {
    if (!this.subscriptions.length || !this.offres.length) return;

    const techCounts: { [key: string]: number } = {};

    this.subscriptions.forEach(sub => {
      const fullOffer = this.offres.find(o => o.id === sub.offer.id || o.nom === sub.offer.nom);
      if (fullOffer && fullOffer.technologies) {
        fullOffer.technologies.forEach((tech: any) => { // Type 'any' used to avoid complex interface matching if mismatch exists
          if (tech.nom) {
            techCounts[tech.nom] = (techCounts[tech.nom] || 0) + 1;
          }
        });
      }
    });

    let maxCount = 0;
    let mostUsed = '';
    for (const [techName, count] of Object.entries(techCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostUsed = techName;
      }
    }
    this.mostUsedTech = mostUsed || 'Aucune Donnée';
  }
}

