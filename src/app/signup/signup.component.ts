import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule,HttpClientModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
        this.authService.signUp(this.signupForm.value).subscribe({
            next: () => (this.message = 'User registered successfully'),
            error: (err) => (this.message = err.error.error || 'Registration failed'),
        });
    }
}

}

