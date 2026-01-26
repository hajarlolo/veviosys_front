import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css'
})
export class ClientListComponent implements OnInit {
  searchFilter: string = 'Touts';
  searchValue: string = '';

  filterOptions = ['Touts', 'CIN', 'Nom', 'Prenom', 'Email', 'Ville', 'Pays'];
  
  allClients: any[] = [];
  filteredClients: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Load clients from backend service
  }

  onAddClient(): void {
    console.log('Add new client');
    // TODO: Navigate to add client form or open modal
  }

  onViewClient(client: any): void {
    console.log('View client details:', client);
    // TODO: Navigate to client details or open modal
  }

  onDeleteClient(client: any): void {
    console.log('Delete client:', client);
    // TODO: Implement delete confirmation and API call
  }
}