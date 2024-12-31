import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports:[CommonModule,FormsModule]
})
export class ProfileComponent implements OnInit {
  profile: { username: string; name: string } = { username: '', name: '' };
  name: string = '';
  username: string = '';
  
  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    // Fetch the profile data when the component is initialized
    this.profileService.getProfile().subscribe(profile => {
      this.profile = profile;
      this.name = profile.name;
      this.username = profile.username;
    });
  }

  // Method to extract the initials from the name
  getInitials(name: string): string {
    const nameParts = name.split(' ');
    let initials = nameParts[0].charAt(0).toUpperCase();
    if (nameParts.length > 1) {
      initials += nameParts[1].charAt(0).toUpperCase();
    }
    return initials;
  }

  updateProfile(): void {
    // Call the profile service to update the user's profile
    this.profileService.updateProfile(this.name, this.username).subscribe({
      next: (data) => {
        this.profile = data; // Update the profile with the new data
        console.log('Profile updated successfully');
      },
      error: (err) => {
        console.error('Error updating profile', err);
      },
    });
  }
  getRandomColor(): string {
    return 'rgba(25, 20, 100, 0.3)';

  }
  
}
