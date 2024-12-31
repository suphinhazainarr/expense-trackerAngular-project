import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgChartsModule],
})
export class DashboardComponent implements OnInit {
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expenses',
        },
        min: 0, // Correct placement for min
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartType: ChartType = 'pie';

  public selectedYear: number = new Date().getFullYear();
  public selectedMonth: string = new Date().toISOString().slice(0, 7);

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.loadBarChartData();
    this.loadPieChartData();
  }

  loadBarChartData(): void {
    this.expenseService.getYearlyExpenses(this.selectedYear).subscribe(
      (data) => {
        this.barChartData = {
          labels: Object.keys(data.monthlyExpenses),
          datasets: [
            {
              data: Object.values(data.monthlyExpenses),
              label: `Expenses for ${this.selectedYear}`,
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching yearly expenses:', error);
      }
    );
  }

  loadPieChartData(): void {
    this.expenseService.getMonthlyExpenses(this.selectedMonth).subscribe(
      (data) => {
        this.pieChartData = {
          labels: Object.keys(data.categoryExpenses),
          datasets: [
            {
              data: Object.values(data.categoryExpenses),
              label: `Category Breakdown`,
              
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching monthly expenses:', error);
      }
    );
  }

  showPreviousYear(): void {
    this.selectedYear--;
    this.loadBarChartData();
  }

  showNextYear(): void {
    this.selectedYear++;
    this.loadBarChartData();
  }

  showPreviousMonth(): void {
    const date = new Date(this.selectedMonth);
    date.setMonth(date.getMonth() - 1);
    this.selectedMonth = date.toISOString().slice(0, 7);
    this.loadPieChartData();
  }

  showNextMonth(): void {
    const date = new Date(this.selectedMonth);
    date.setMonth(date.getMonth() + 1);
    this.selectedMonth = date.toISOString().slice(0, 7);
    this.loadPieChartData();
  }
}
