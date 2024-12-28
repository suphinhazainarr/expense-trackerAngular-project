import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ProfileComponent } from './profile/profile.component';
import { ExpenseManagementComponent } from './expense-management/expense-management.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'signup', 
    loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) 
  },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'add-expense', component: AddExpenseComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'expense-history', component: ExpenseManagementComponent },
  { path: '**', redirectTo: '/login' },
];
 