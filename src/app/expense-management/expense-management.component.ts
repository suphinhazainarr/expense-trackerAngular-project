import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expense.service';

interface Expense {
  name: string;
  amount: number;
  date: string;
  category: string;
}

@Component({
  selector: 'app-expense-management',
  imports: [RouterModule,CommonModule],
  templateUrl: './expense-management.component.html',
  styleUrl: './expense-management.component.css'
})
export class ExpenseManagementComponent {
  expenses: Expense[] = [];
  loggedInUsername: string = '';
  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.loggedInUsername = localStorage.getItem('username') || '' ; 
    console.log('Fetching expenses for username:', this.loggedInUsername);

    this.expenseService.getExpensesByUsername(this.loggedInUsername).subscribe(
      (data) => {
        this.expenses = data;
        this.sortBy('date'); // Default sorting
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  sortBy(criteria: string): void {
    if (criteria === 'date') {
      this.expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (criteria === 'category') {
      this.expenses.sort((a, b) => a.category.localeCompare(b.category));
    } else if (criteria === 'amount') {
      this.expenses.sort((a, b) => b.amount - a.amount);
    }
  }
}
