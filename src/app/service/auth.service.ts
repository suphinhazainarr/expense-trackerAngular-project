import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // Sign up a new user
  signUp(user: { username: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  // Log in the user
  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      // Store the token in localStorage on successful login
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token); // Store the JWT token
        }
      })
    );
  }

  // Log out the user
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('authToken'); // Remove the token from localStorage
        this.router.navigate(['/login']); // Redirect to login page
      })
    );
  }

  // Check if the user is logged in (based on token presence)
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Optional: Decode token and get user information (useful for showing user details)
  getUserFromToken(): any {
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT token
      return decoded;
    }
    return null;
  }

  // Optional: Check if token is expired
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true; // Token doesn't exist, so it's considered expired
    }

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime; // Token expired if the expiration time is less than current time
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Treat errors as token expiration
    }
  }
}
