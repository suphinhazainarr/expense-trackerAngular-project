import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Expense {
  name: string;
  amount: number;
  date: string;
  category: string;
}
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5000/api/expenses'; // Adjust URL based on your API

  constructor(private http: HttpClient) {}

  // Add a new expense
  addExpense(expense: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      'Content-Type': 'application/json', // Ensure Content-Type is set to JSON
    });

    return this.http.post(this.apiUrl, expense, { headers });
  }

  // Fetch monthly expenses
  getMonthlyExpenses(month: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
    });
 console.log("expense service monthly");
    return this.http.get(`${this.apiUrl}/monthly-expenses?month=${month}`, {
      headers,
    });
  }

  // Fetch yearly expenses
  getYearlyExpenses(year: number): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, 
    });

    return this.http.get(`${this.apiUrl}/yearly-expenses?year=${year}`, {
      headers,
    });
  }

  getExpensesByUsername(username: string): Observable<Expense[]> {
    const token = localStorage.getItem('authToken'); // or however you store the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get<Expense[]>(`${this.apiUrl}?username=${username}`, { headers });
  }
  
}
