import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { DashboardService } from '../../../Services/dashboard.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  // Dynamic card data
  cards = [
    { title: 'Total Members', value: 120 },
    { title: 'Due Payments', value: 15 },
    { title: 'Total Payments Received', value: 50000 },
    { title: 'Gym Programs', value: 8 }
  ];

  ngOnInit() {
    this.renderGenderChart();
    this.renderPaymentsChart();
  }

  // Chart: Gender Distribution
  renderGenderChart() {
    new Chart('genderChart', {
      type: 'bar',
      data: {
        labels: ['Male Members', 'Female Members'],
        datasets: [
          {
            label: 'Members Count',
            data: [70, 50],
            backgroundColor: ['#007bff', '#dc3545']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true }
        }
      }
    });
  }

  // Chart: Monthly Payments
  renderPaymentsChart() {
    new Chart('paymentsChart', {
      type: 'line',
      data: {
        labels: [
          'January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
          {
            label: 'Payments Received',
            data: [
              5000, 7000, 8000, 4000, 10000, 9000, 
              7000, 6000, 8000, 11000, 9000, 12000
            ],
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.3)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true }
        },
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    });
  }
}
