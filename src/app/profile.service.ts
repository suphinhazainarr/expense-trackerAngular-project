import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:5000/api/profile'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch user profile
  getProfile(): Observable<{ username: string; name: string }> {
    const token = localStorage.getItem('authToken'); // or however you store the token

    // Ensure that the token exists before attaching it to headers
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ username: string; name: string }>(this.apiUrl, { headers });
  }

  // Update user profile
  updateProfile(name: string, username: string): Observable<{ username: string; name: string }> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<{ username: string; name: string }>(this.apiUrl, { name, username }, { headers });
  }
}
