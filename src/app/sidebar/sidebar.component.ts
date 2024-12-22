import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true, // Ensures this is a standalone component

  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show');
    }
  }
}
