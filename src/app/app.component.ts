import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';  // Import RouterModule
import { SidebarComponent } from './sidebar/sidebar.component';  // Import SidebarComponent
import { routes } from './app.routes';  // Import your routing configuration
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,  // Mark it as a standalone component
  imports: [RouterModule, SidebarComponent,CommonModule
    
  ],  // RouterModule is used for routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'expense-tracker';
  sidebarHidden = true; // Initially hidden

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Show/hide sidebar based on the current route
        this.sidebarHidden = this.router.url === '/login' || this.router.url === '/signup';
      }
    });
  }

  toggleSidebar() {
    this.sidebarHidden = !this.sidebarHidden;
  }
  
}
