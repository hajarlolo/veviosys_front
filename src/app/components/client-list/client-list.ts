import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
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

  // These need to be typed as Client[] to match your model
  allClients: Client[] = [];
  filteredClients: Client[] = [];

  // 1. INJECT the service here
  constructor(private clientService: ClientService,private cdr: ChangeDetectorRef) { }

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
        case 'Ville': return client.ville.toLowerCase().includes(search);
        case 'Pays': return client.pays.toLowerCase().includes(search);
        default: // 'Touts' - search everything
          return Object.values(client).some(val =>
            String(val).toLowerCase().includes(search)
          );
      }
    });
  }

  onAddClient(): void { console.log('Add new client'); }
  onViewClient(client: Client): void { console.log('View details:', client); }
  onDeleteClient(client: Client): void {
    if (confirm(`Voulez-vous vraiment supprimer le client ${client.prenom} ${client.nom} ?`)) {
      this.clientService.deleteClient(client.id).subscribe({
        next: () => {
          // Remove from local array so the UI updates immediately
          this.allClients = this.allClients.filter(c => c.id !== client.id);
          this.applyFilter(); // Update the filtered view too
          console.log('Client deleted successfully');
        },
        error: (err) => console.error('Delete failed', err)
      });
    }
  }
}