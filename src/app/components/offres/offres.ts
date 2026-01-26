import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Offer } from '../../models/offer.model';
import { OfferService } from '../../services/offer';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offres.html',
  styleUrl: './offres.css'
})
export class OffresComponent implements OnInit {
  offers: Offer[] = [];
  filteredOffers: Offer[] = [];
  showModal = false;
  editingId: number | null = null;
  filterStatus = 'Toute';
  searchValue = '';
  priceMin = '';
  priceMax = '';
  
  newOffer: Offer = {
    nom: '',
    description: '',
    prix: 0,
    dureeMois: 1,
    populaire: false
  };

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offerService.getOffers().subscribe({
      next: (data) => {
        this.offers = data;
        this.applyFilter();
      },
      error: (err) => console.error('Error loading offers:', err)
    });
  }

  applyFilter(): void {
    if (this.filterStatus === 'Toute') {
      this.filteredOffers = this.offers;
    } else if (this.filterStatus === 'Nom') {
      this.filteredOffers = this.offers.filter(o => 
        o.nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        o.description.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else if (this.filterStatus === 'Prix') {
      this.filteredOffers = this.offers.filter(o => {
        const min = this.priceMin ? parseFloat(this.priceMin) : 0;
        const max = this.priceMax ? parseFloat(this.priceMax) : Infinity;
        return o.prix >= min && o.prix <= max;
      });
    }
  }

  onFilterChange(): void {
    this.searchValue = '';
    this.priceMin = '';
    this.priceMax = '';
    this.applyFilter();
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  onPriceChange(): void {
    this.applyFilter();
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
    this.newOffer = {
      nom: '',
      description: '',
      prix: 0,
      dureeMois: 1,
      populaire: false
    };
  }

  editOffer(offer: Offer): void {
    this.newOffer = { ...offer };
    this.editingId = offer.id || null;
    this.showModal = true;
  }

  saveOffer(): void {
    if (!this.newOffer.nom.trim()) {
      alert('Le nom est requis');
      return;
    }

    if (this.editingId) {
      this.offerService.updateOffer(this.editingId, this.newOffer).subscribe({
        next: () => {
          this.loadOffers();
          this.closeModal();
        },
        error: (err) => console.error('Error updating offer:', err)
      });
    } else {
      this.offerService.createOffer(this.newOffer).subscribe({
        next: () => {
          this.loadOffers();
          this.closeModal();
        },
        error: (err) => console.error('Error creating offer:', err)
      });
    }
  }

  deleteOffer(id: number | undefined): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre?')) {
      this.offerService.deleteOffer(id).subscribe({
        next: () => {
          this.loadOffers();
        },
        error: (err) => console.error('Error deleting offer:', err)
      });
    }
  }
}