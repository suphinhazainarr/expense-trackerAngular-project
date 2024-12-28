import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  expenses: Expense[] = [
    { name: 'Groceries', amount: 50, date: '2024-12-10', category: 'Food' },
    { name: 'Bus Ticket', amount: 10, date: '2024-12-08', category: 'Transport' },
    { name: 'Movie Night', amount: 15, date: '2024-12-07', category: 'Entertainment' },
    // Add more sample data or fetch from a service
  ];

  ngOnInit() {
    this.sortBy('date'); // Default sorting
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
