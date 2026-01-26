import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor() {}

  ngOnInit(): void {
    // Load data from backend services
  }
}