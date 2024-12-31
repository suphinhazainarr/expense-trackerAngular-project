import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  logoutTimeout: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.message = 'Login successful!';
          this.setLogoutTimer(60 *60 * 1000); // Set auto-logout timer for 1 hour
          this.router.navigate(['/dashboard']);
        },
        error: (err: { error: { error: string } }) => {
          this.message = err.error.error;
        }
      });
    }
  }

  setLogoutTimer(duration: number) {
    clearTimeout(this.logoutTimeout); // Clear any existing timers
    this.logoutTimeout = setTimeout(() => {
      this.logout();
    }, duration);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.message = 'Session expired. Please log in again.';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }
}
