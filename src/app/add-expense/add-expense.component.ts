import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expense.service';
import { FormsModule } from '@angular/forms'; // Add this import
import * as Papa from 'papaparse';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent {
  expenseForm: FormGroup;
  categories: string[] = ['Food', 'Travel', 'Shopping', 'Utilities']; // Predefined categories
  isAddingCategory: boolean = false;
  newCategory: string = ''; // For binding the new category input field
  fileData: any[] = []; // Store parsed CSV data

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      category: ['', Validators.required],
      notes: [''],
    });
  }

  toggleAddCategory() {
    this.isAddingCategory = !this.isAddingCategory;
  }

  addCategory(newCategory: string) {
    if (newCategory && !this.categories.includes(newCategory)) {
      this.categories.push(newCategory);
      this.expenseForm.controls['category'].setValue(newCategory); // Set newly added category
      this.isAddingCategory = false; // Close add-category input
      this.newCategory = ''; // Reset new category input
    }
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      console.log('Form Data:', this.expenseForm.value); // Log form data
      const formData = this.expenseForm.value;
      const username = localStorage.getItem('username');
      console.log('Username:', username); // Log username from localStorage
  
      const expenseData = {
        ...formData,
        username: username,  // Ensure username is passed along with the expense data
      };
  
      this.expenseService.addExpense(expenseData).subscribe(
        (response) => {
          console.log('Expense Added:', response); // Log success response
          this.expenseForm.reset(); // Reset form values, but not validation
        },
        (error) => {
          console.error('Error adding expense:', error); // Log error response
        }
      );
    } else {
      console.log('Form is invalid'); // Log invalid form
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log('Parsed CSV Result:', result);
          this.fileData = result.data;
          this.processCSVData();
        },
        header: true, // Assuming CSV has headers
      });
    }
  }

  // Process parsed CSV data and add expenses
  processCSVData() {
    const username = localStorage.getItem('username');
    const expenses = this.fileData.map((data: any) => ({
      ...data,
      username: username,
    }));
    console.log('Expenses from CSV:', expenses);

    // Send the data to your backend service
    this.expenseService.addExpense(expenses).subscribe(
      (response) => {
        console.log('Expenses Imported:', response);
      },
      (error) => {
        console.error('Error importing expenses:', error);
      }
    );
  }
}
