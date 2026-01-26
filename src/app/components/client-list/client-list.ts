import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css'
})
export class ClientListComponent {
  searchFilter: string = 'Touts';
  searchValue: string = '';

  filterOptions = ['Touts', 'CIN', 'Nom', 'Prenom', 'Email', 'Ville', 'Pays'];

  allClients = [
    {
      nom: 'Alami',
      prenom: 'Hassan',
      ville: 'Casablanca',
      pays: 'Maroc',
      cin: 'AB123456',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      nom: 'Bennani',
      prenom: 'Fatima',
      ville: 'Rabat',
      pays: 'Maroc',
      cin: 'CD789012',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      nom: 'Mansouri',
      prenom: 'Amine',
      ville: 'Marrakech',
      pays: 'Maroc',
      cin: 'EF345678',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      nom: 'Tazi',
      prenom: 'Nadia',
      ville: 'Fes',
      pays: 'Maroc',
      cin: 'GH901234',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    {
      nom: 'Idrissi',
      prenom: 'Youssef',
      ville: 'Tanger',
      pays: 'Maroc',
      cin: 'IJ567890',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=13'
    },
    {
      nom: 'Berrada',
      prenom: 'Samira',
      ville: 'Agadir',
      pays: 'Maroc',
      cin: 'KL123456',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=10'
    },
    {
      nom: 'Chraibi',
      prenom: 'Omar',
      ville: 'Casablanca',
      pays: 'Maroc',
      cin: 'MN789012',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=14'
    },
    {
      nom: 'Fassi',
      prenom: 'Laila',
      ville: 'Meknes',
      pays: 'Maroc',
      cin: 'OP345678',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=16'
    },
    {
      nom: 'Kettani',
      prenom: 'Karim',
      ville: 'Oujda',
      pays: 'Maroc',
      cin: 'QR901234',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=15'
    },
    {
      nom: 'Lamrani',
      prenom: 'Zineb',
      ville: 'Kenitra',
      pays: 'Maroc',
      cin: 'ST567890',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=20'
    },
    {
      nom: 'Naciri',
      prenom: 'Mehdi',
      ville: 'Tetouan',
      pays: 'Maroc',
      cin: 'UV123456',
      email: 'Clientmoka@gmail.com',
      telephone: '+212 6 66572876',
      avatar: 'https://i.pravatar.cc/150?img=11'
    }
  ];

  get filteredClients() {
    if (!this.searchValue.trim()) {
      return this.allClients;
    }

    const searchLower = this.searchValue.toLowerCase();

    return this.allClients.filter(client => {
      switch (this.searchFilter) {
        case 'CIN':
          return client.cin.toLowerCase().includes(searchLower);
        case 'Nom':
          return client.nom.toLowerCase().includes(searchLower);
        case 'Prenom':
          return client.prenom.toLowerCase().includes(searchLower);
        case 'Email':
          return client.email.toLowerCase().includes(searchLower);
        case 'Ville':
          return client.ville.toLowerCase().includes(searchLower);
        case 'Pays':
          return client.pays.toLowerCase().includes(searchLower);
        default: // 'Touts'
          return client.nom.toLowerCase().includes(searchLower) ||
            client.prenom.toLowerCase().includes(searchLower) ||
            client.email.toLowerCase().includes(searchLower) ||
            client.ville.toLowerCase().includes(searchLower) ||
            client.cin.toLowerCase().includes(searchLower);
      }
    });
  }

  onAddClient() {
    console.log('Add new client');
    // TODO: Navigate to add client form or open modal
  }

  onViewClient(client: any) {
    console.log('View client details:', client);
    // TODO: Navigate to client details or open modal
  }

  onDeleteClient(client: any) {
    console.log('Delete client:', client);
    // TODO: Implement delete confirmation and API call
  }
}