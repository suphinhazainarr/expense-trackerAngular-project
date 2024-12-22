import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [AgCharts,RouterModule],
})
export class DashboardComponent {
  public barChartOptions: AgChartOptions;
  public pieChartOptions: AgChartOptions;

  constructor() {
    // Bar chart configuration
    this.barChartOptions = {
      data: [
        { month: 'Jan', expenses: 100 },
        { month: 'Feb', expenses: 200 },
        { month: 'Mar', expenses: 300 },
        { month: 'Apr', expenses: 150 },
        { month: 'May', expenses: 250 },
      ],
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'expenses',
          label: {
            enabled: true,
          },
        },
      ],
    };

    // Pie chart configuration
    this.pieChartOptions = {
      data: [
        { asset: 'Stocks', amount: 500 },
        { asset: 'Bonds', amount: 300 },
        { asset: 'Real Estate', amount: 200 },
        { asset: 'Crypto', amount: 100 },
      ],
      title: {
        text: 'Portfolio Composition',
      },
      series: [
        {
          type: 'pie',
          angleKey: 'amount',
          legendItemKey: 'asset',
        },
      ],
    };
  }
}
