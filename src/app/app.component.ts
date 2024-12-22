import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { SidebarComponent } from './sidebar/sidebar.component';  // Import SidebarComponent
import { routes } from './app.routes';  // Import your routing configuration

@Component({
  selector: 'app-root',
  standalone: true,  // Mark it as a standalone component
  imports: [RouterModule, SidebarComponent],  // RouterModule is used for routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'expense-tracker';
}
