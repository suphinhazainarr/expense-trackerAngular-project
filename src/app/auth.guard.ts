import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';  // Correct import for the named export

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
  
    if (!token) {
      console.warn('No token found. Redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }
  
    if (this.isTokenExpired(token)) {
      console.warn('Token expired. Redirecting to login.');
      this.router.navigate(['/login']);
      localStorage.removeItem('authToken'); // Clear expired token
      return false;
    }
  
    console.log('Token valid. Proceeding.');
    return true;
  }
  

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token);  // Use jwtDecode
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime; // Check if the token is expired
    } catch (error) {
      console.error('Invalid token:', error);
      return true;
    }
  }
}
