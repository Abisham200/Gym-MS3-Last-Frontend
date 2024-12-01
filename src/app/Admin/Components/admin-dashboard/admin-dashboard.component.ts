import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { DashboardService } from '../../../Services/dashboard.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  totalMembers = 0;
  revenue = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.totalMembers = data.totalMembers;
      this.revenue = data.revenue;
      this.updateChart(data.trends);
    });
  }

  updateChart(trends: number[]): void {
    // Logic to update the chart dynamically
  }
}
