import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})

export class AddExpenseComponent {
  expenseForm: FormGroup;
  categories: string[] = ['Food', 'Travel', 'Shopping', 'Utilities']; // Predefined categories
  isAddingCategory: boolean = false;

    constructor(private fb: FormBuilder) {
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
    }
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      console.log('Expense Added:', this.expenseForm.value);
      // Handle the form submission logic here
    }
  }
}
