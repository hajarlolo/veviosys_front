import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  // These are the stats at the top of Page 2 in your PDF
  mostUsedTech = "Documania CM";
  mostFollowedOffer = "Offre n-1";
  totalOffers = 50;

  // Mock data for the cards
  offres = [
    { nom: 'Professional', prix: '10.99', features: ['Unlimited Bandwidth', 'PDF Access Sosmed', 'Support System'], popular: true },
    { nom: 'Standard', prix: '5.99', features: ['Basic Bandwidth', 'PDF Access', 'Email Support'], popular: false },
    { nom: 'Enterprise', prix: '20.99', features: ['Unlimited everything', 'Priority Support', 'Custom Integration'], popular: false }
  ];

  techs = [
    { nom: 'NSIA ASSURANCES', description: 'Assurances Digitales' },
    { nom: 'DOCUMANIA Content Manager', description: 'Gestion de contenu' },
    { nom: 'DOCUMANIA Courrier', description: 'Gestion de courrier' }
  ];
}