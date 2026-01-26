import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar'; // Path to your sidebar
import { HeaderComponent } from './components/header/header'; // Add this line

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent,HeaderComponent], // Include HeaderComponent here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Abonnement_front';
}
