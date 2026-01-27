import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Add this for [(ngModel)] search
import { ClientService } from '../../services/client';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Added FormsModule
  templateUrl: './client-list.html',
  styleUrl: './client-list.css'
})
export class ClientListComponent implements OnInit {
  searchFilter: string = 'Touts';
  searchValue: string = '';
  filterOptions = ['Touts', 'CIN', 'Nom', 'Prenom', 'Email', 'Ville', 'Pays'];

  allClients: Client[] = [];
  filteredClients: Client[] = [];

  showModal = false;
  showViewModal = false;
  editingId: number | null = null;
  viewingClient: Client | null = null;

  newClient: Client = {
    id: 0,
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    pays: '',
    ville: '',
    adresse: '',
    profil: ''
  };

  // 1. INJECT the service here
  constructor(private clientService: ClientService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // 2. Call the backend
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data: Client[]) => {
        this.allClients = data;
        this.filteredClients = [...data]; // Show all by default
        this.cdr.detectChanges(); // Ensure UI updates
        console.log('Backend connection successful!', data);
      },
      error: (err: any) => {
        console.error('Connection failed! Check if Spring Boot is running and CORS is enabled.', err);
      }
    });
  }

  // Logic for your search bar
  applyFilter(): void {
    const search = this.searchValue.toLowerCase().trim();

    if (!search) {
      this.filteredClients = this.allClients;
      return;
    }

    this.filteredClients = this.allClients.filter(client => {
      switch (this.searchFilter) {
        case 'CIN': return client.cin.toLowerCase().includes(search);
        case 'Nom': return client.nom.toLowerCase().includes(search);
        case 'Prenom': return client.prenom.toLowerCase().includes(search);
        case 'Email': return client.email.toLowerCase().includes(search);
        case 'Ville': return client.ville?.toLowerCase().includes(search) || false;
        case 'Pays': return client.pays?.toLowerCase().includes(search) || false;
        default: // 'Touts' - search everything
          return Object.values(client).some(val =>
            String(val).toLowerCase().includes(search)
          );
      }
    });
  }

  onAddClient(): void {
    this.openModal();
    console.log('Add new client');
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
    this.newClient = {
      cin: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      pays: '',
      ville: '',
      adresse: ''
    };
  }

  onEditClient(client: Client): void {
    this.newClient = { ...client };
    this.editingId = client.id || null;
    this.showModal = true;
  }

  saveClient(): void {
    if (!this.newClient.cin.trim() || !this.newClient.nom.trim() || !this.newClient.prenom.trim() || !this.newClient.email.trim()) {
      alert('Veuillez remplir les champs obligatoires (CIN, Nom, Prénom, Email)');
      return;
    }

    if (this.editingId) {
      this.clientService.updateClient(this.editingId, this.newClient).subscribe({
        next: () => {
          this.loadClients();
          this.closeModal();
        },
        error: (err: any) => console.error('Error updating client:', err)
      });
    } else {
      this.clientService.createClient(this.newClient).subscribe({
        next: () => {
          this.loadClients();
          this.closeModal();
        },
        error: (err: any) => console.error('Error creating client:', err)
      });
    }
  }

  onViewClient(client: Client): void {
    this.viewingClient = { ...client };
    this.showViewModal = true;
    console.log('Viewing details for:', client);
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.viewingClient = null;
  }
  onDeleteClient(client: Client): void {
    if (confirm(`Voulez-vous vraiment supprimer le client ${client.prenom} ${client.nom} ?`)) {
      if (client.id !== undefined) {
        this.clientService.deleteClient(client.id).subscribe({
          next: () => {
            // Remove from local array so the UI updates immediately
            this.allClients = this.allClients.filter(c => c.id !== client.id);
            this.applyFilter(); // Update the filtered view too
            console.log('Client deleted successfully');
          },
          error: (err: any) => console.error('Delete failed', err)
        });
      }
    }
  }
}