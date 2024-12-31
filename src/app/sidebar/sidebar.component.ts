import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isHidden = false;
  username: string = '';
  initials: string = '';
  avatarColor: string = '#000';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((profile) => {
      if (profile && profile.username) {
        this.username = profile.username;

        // Set initials based on the first name and last name (if available)
        this.initials = this.getInitials(profile.name);

        // Generate a random avatar color
        this.avatarColor = this.getRandomColor();
      }
    });
  }

  // Get initials (first letter of first and last names)
  getInitials(name: string): string {
    const nameParts = name.trim().split(' ');
    let initials = nameParts[0].charAt(0).toUpperCase();  // First letter of first name

    // If there is a last name, take the first letter of the last name
    if (nameParts.length > 1) {
      initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();  // First letter of last name
    }

    return initials;
  }

  private getRandomColor(): string {
    const baseColor = { r: 41, g: 47, b: 61 }; // base RGB values

    // Randomly adjust each color component within a small range
    const r = Math.min(255, Math.max(0, baseColor.r + this.getRandomOffset()));
    const g = Math.min(255, Math.max(0, baseColor.g + this.getRandomOffset()));
    const b = Math.min(255, Math.max(0, baseColor.b + this.getRandomOffset()));

    return `rgb(${r}, ${g}, ${b})`;  // Return the color string
  }

  private getRandomOffset(): number {
    // Generate a random number between -20 and 20 for slight variation
    return Math.floor(Math.random() * 41) - 20;
  }
}
