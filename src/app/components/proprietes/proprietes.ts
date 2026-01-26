import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Propriete } from '../../models/propriete.model';
import { ProprietesService } from '../../services/proprietes';

@Component({
  selector: 'app-proprietes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proprietes.html',
  styleUrl: './proprietes.css'
})
export class ProprietesComponent implements OnInit {
  proprietes: Propriete[] = [];
  filteredProprietes: Propriete[] = [];
  showModal = false;
  editingId: number | null = null;
  filterStatus = 'Toute';
  searchValue = '';
  priceMin = '';
  priceMax = '';
  
  newPropriete: Propriete = {
    nom: '',
    description: '',
    valeur: '',
    type: ''
  };

  constructor(private proprietesService: ProprietesService) {}

  ngOnInit(): void {
    this.loadProprietes();
  }

  loadProprietes(): void {
    this.proprietesService.getProprietes().subscribe({
      next: (data) => {
        this.proprietes = data;
        this.applyFilter();
      },
      error: (err) => console.error('Error loading proprietes:', err)
    });
  }

  applyFilter(): void {
    if (this.filterStatus === 'Toute') {
      this.filteredProprietes = this.proprietes;
    } else if (this.filterStatus === 'Libelle') {
      this.filteredProprietes = this.proprietes.filter(p => 
        p.nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else if (this.filterStatus === 'Prix') {
      this.filteredProprietes = this.proprietes.filter(p => {
        const prix = parseFloat(p.valeur);
        const min = this.priceMin ? parseFloat(this.priceMin) : 0;
        const max = this.priceMax ? parseFloat(this.priceMax) : Infinity;
        return prix >= min && prix <= max;
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
    this.newPropriete = {
      nom: '',
      description: '',
      valeur: '',
      type: ''
    };
  }

  editPropriete(propriete: Propriete): void {
    this.newPropriete = { ...propriete };
    this.editingId = propriete.id || null;
    this.showModal = true;
  }

  savePropriete(): void {
    if (!this.newPropriete.nom.trim()) {
      alert('Le nom est requis');
      return;
    }

    if (this.editingId) {
      this.proprietesService.updatePropriete(this.editingId, this.newPropriete).subscribe({
        next: () => {
          this.loadProprietes();
          this.closeModal();
        },
        error: (err) => console.error('Error updating propriete:', err)
      });
    } else {
      this.proprietesService.createPropriete(this.newPropriete).subscribe({
        next: () => {
          this.loadProprietes();
          this.closeModal();
        },
        error: (err) => console.error('Error creating propriete:', err)
      });
    }
  }

  deletePropriete(id: number | undefined): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété?')) {
      this.proprietesService.deletePropriete(id).subscribe({
        next: () => {
          this.loadProprietes();
        },
        error: (err) => console.error('Error deleting propriete:', err)
      });
    }
  }
}