import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from '../../models/subscription.model';
import { SubscriptionService } from '../../services/subscription';
import { ClientService } from '../../services/client';
import { OfferService } from '../../services/offer';
import { Client } from '../../models/client.model';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-abonnements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './abonnements.html',
  styleUrl: './abonnements.css'
})
export class AbonnementsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  filteredSubscriptions: Subscription[] = [];
  clients: Client[] = [];
  offers: Offer[] = [];
  showModal = false;
  editingId: number | null = null;
  filterStatus = 'Toute';
  searchValue = '';
  priceMin = '';
  priceMax = '';
  dateStart = '';
  dateEnd = '';
  selectedClient = '';
  selectedOffer = '';
  
  newSubscription: Subscription = {
    client: undefined,
    offer: undefined,
    dateDebut: '',
    dateFin: '',
    prix: 0,
    statut: 'Actif'
  };

  constructor(
    private subscriptionService: SubscriptionService,
    private clientService: ClientService,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
    this.loadClients();
    this.loadOffers();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions = data;
        this.applyFilter();
      },
      error: (err) => console.error('Error loading subscriptions:', err)
    });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => console.error('Error loading clients:', err)
    });
  }

  loadOffers(): void {
    this.offerService.getOffers().subscribe({
      next: (data) => {
        this.offers = data;
      },
      error: (err) => console.error('Error loading offers:', err)
    });
  }

  applyFilter(): void {
    if (this.filterStatus === 'Toute') {
      this.filteredSubscriptions = this.subscriptions;
    } else if (this.filterStatus === 'Prix') {
      this.filteredSubscriptions = this.subscriptions.filter(s => {
        const min = this.priceMin ? parseFloat(this.priceMin) : 0;
        const max = this.priceMax ? parseFloat(this.priceMax) : Infinity;
        return s.prix >= min && s.prix <= max;
      });
    } else if (this.filterStatus === 'Client') {
      this.filteredSubscriptions = this.subscriptions.filter(s =>
        s.client?.nom.toLowerCase().includes(this.selectedClient.toLowerCase())
      );
    } else if (this.filterStatus === 'Offre') {
      this.filteredSubscriptions = this.subscriptions.filter(s =>
        s.offer?.nom.toLowerCase().includes(this.selectedOffer.toLowerCase())
      );
    } else if (this.filterStatus === 'Date') {
      this.filteredSubscriptions = this.subscriptions.filter(s => {
        const subDate = new Date(s.dateDebut);
        const start = this.dateStart ? new Date(this.dateStart) : new Date('1900-01-01');
        const end = this.dateEnd ? new Date(this.dateEnd) : new Date('2100-12-31');
        return subDate >= start && subDate <= end;
      });
    }
  }

  onFilterChange(): void {
    this.searchValue = '';
    this.priceMin = '';
    this.priceMax = '';
    this.dateStart = '';
    this.dateEnd = '';
    this.selectedClient = '';
    this.selectedOffer = '';
    this.applyFilter();
  }

  onFilterInputChange(): void {
    this.applyFilter();
  }

  printSubscriptions(): void {
    window.print();
  }

  openModal(): void {
    this.resetForm();
    this.editingId = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newSubscription = {
      client: undefined,
      offer: undefined,
      dateDebut: '',
      dateFin: '',
      prix: 0,
      statut: 'Actif'
    };
  }

  editSubscription(subscription: Subscription): void {
    this.newSubscription = { ...subscription };
    this.editingId = subscription.id || null;
    this.showModal = true;
  }

  saveSubscription(): void {
    if (!this.newSubscription.client || !this.newSubscription.offer) {
      alert('Veuillez sélectionner un client et une offre');
      return;
    }

    if (this.editingId) {
      this.subscriptionService.updateSubscription(this.editingId, this.newSubscription).subscribe({
        next: () => {
          this.loadSubscriptions();
          this.closeModal();
        },
        error: (err) => console.error('Error updating subscription:', err)
      });
    } else {
      this.subscriptionService.createSubscription(this.newSubscription).subscribe({
        next: () => {
          this.loadSubscriptions();
          this.closeModal();
        },
        error: (err) => console.error('Error creating subscription:', err)
      });
    }
  }

  deleteSubscription(id: number | undefined): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cet abonnement?')) {
      this.subscriptionService.deleteSubscription(id).subscribe({
        next: () => {
          this.loadSubscriptions();
        },
        error: (err) => console.error('Error deleting subscription:', err)
      });
    }
  }

  viewSubscription(subscription: Subscription): void {
    console.log('View subscription:', subscription);
  }

  downloadSubscription(subscription: Subscription): void {
    console.log('Download subscription:', subscription);
  }
}