import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Technology } from '../../models/technology.model';
import { TechnologyService } from '../../services/technology';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './technologies.html',
  styleUrl: './technologies.css'
})
export class TechnologiesComponent implements OnInit {
  technologies: Technology[] = [];
  filteredTechnologies: Technology[] = [];
  showModal = false;
  editingId: number | null = null;
  filterStatus = 'Toute';
  selectedFile: File | null = null; // ✅ Fichier sélectionné
  photoPreview: string | null = null;
  
  newTechnology: Technology = {
    nom: '',
    description: '',
    prix: 0,
    disponible: true
  };

  constructor(private technologyService: TechnologyService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTechnologies();
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
  
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      alert('La taille de l\'image ne doit pas dépasser 5MB');
      return;
    }
  
    this.selectedFile = file;
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photoPreview = e.target.result;
      this.newTechnology.photo = e.target.result; // base64
    };
    reader.readAsDataURL(file);
  }
  loadTechnologies(): void {
    this.technologyService.getTechnologies().subscribe({
      next: (data) => {
        this.technologies = data;
        this.filterStatus = 'Toute';
        this.applyFilter();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading technologies:', err)
    });
  }

  applyFilter(): void {
    if (this.filterStatus === 'Toute') {
      this.filteredTechnologies = this.technologies;
    } else if (this.filterStatus === 'Disponible') {
      this.filteredTechnologies = this.technologies.filter(t => t.disponible);
    } else if (this.filterStatus === 'Indisponible') {
      this.filteredTechnologies = this.technologies.filter(t => !t.disponible);
    }
  }

  onFilterChange(): void {
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
    this.newTechnology = {
      nom: '',
      description: '',
      prix: 0,
      disponible: true,
      photo: ''
    };
  
    this.selectedFile = null;
    this.photoPreview = null;
  }

  editTechnology(technology: Technology): void {
    this.newTechnology = { ...technology };
    this.editingId = technology.id || null;
  
    this.photoPreview = technology.photo || null; 
    this.showModal = true;
  }

  saveTechnology(): void {
    if (!this.newTechnology.nom.trim()) {
      alert('Le nom est requis');
      return;
    }

    if (this.editingId) {
      this.technologyService.updateTechnology(this.editingId, this.newTechnology).subscribe({
        next: () => {
          this.loadTechnologies();
          this.closeModal();
        },
        error: (err) => console.error('Error updating technology:', err)
      });
    } else {
      this.technologyService.createTechnology(this.newTechnology).subscribe({
        next: () => {
          this.loadTechnologies();
          this.closeModal();
        },
        error: (err) => console.error('Error creating technology:', err)
      });
    }
  }

  deleteTechnology(id: number | undefined): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cette technologie?')) {
      this.technologyService.deleteTechnology(id).subscribe({
        next: () => {
          this.loadTechnologies();
        },
        error: (err) => console.error('Error deleting technology:', err)
      });
    }
  }
}
