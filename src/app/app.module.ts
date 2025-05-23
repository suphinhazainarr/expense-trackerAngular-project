// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ProfileComponent } from './profile/profile.component';

// Import AgChartsModule
import { AgChartsModule } from 'ag-charts-angular';

// Import routes from app.routes.ts
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';  // Import NgChartsModule

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddExpenseComponent,
    ProfileComponent,
    NgChartsModule // Declare the ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Use routes from app.routes.ts
    AgChartsModule,
    HttpClientModule // Import AgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
