import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { DashboardService } from '../../../Services/dashboard.service';
import { User } from '../../../Modals/user';
import { Program } from '../../../Modals/program';
import { UserService } from '../../../Services/user.service';
import { ProgramService } from '../../../Services/program.service';
import { PaymentService } from '../../../Services/payment.service';
import { EnrollmentService } from '../../../Services/enrollment.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  users : User[] =[];
maleUsers: User[] =[];
femaleUsers: User[] =[];
countMale:number=0;
countFemale:number=0;
length! : number;
programs! : Program[];
cards:any;
totalPayments: number = 0;
duePayments:number = 0;

constructor(private userService : UserService,private programsService : ProgramService,
  private paymentsService : PaymentService , private enrollmentsService : EnrollmentService)
{}

ngOnInit() {
  this.fetchPrograms();
  this.fetchTotalPayments();
  this.fetchMonthlyPayments();
  this.fetchDuePayments();

  // Fetch users and initialize cards dynamically
  this.userService.loadUsers().subscribe(
    (data) => {
      this.users = data;

      // Separate male and female users
      this.maleUsers = this.users.filter((u) => u.gender === 0);
      this.femaleUsers = this.users.filter((u) => u.gender === 1);

      this.countMale = this.maleUsers.length;
      this.countFemale = this.femaleUsers.length;

      this.renderGenderChart();

      this.updateCards();
    },
    (error) => {
      console.error('Error loading users:', error);
    }
  );
}

// Fetch Total Payments
fetchTotalPayments(): void {
  this.paymentsService.getTotalPaymentAmount().subscribe(
    (data: number) => {
      this.totalPayments = data; 
      this.updateCards(); 
    },
    (error) => {
      console.error('Error fetching total payments:', error);
    }
  );
}

// Dynamically update the cards array
updateCards(): void {
  this.cards = [
    { title: 'Total Members', value: this.users.length },
    { title: 'Due Payments', value: this.fetchDuePayments }, 
    { title: 'Total Payments Received', value: this.totalPayments || 0 },
    { title: 'Gym Programs', value: this.programs?.length || 0 }
  ];
}


fetchDuePayments() {
  this.enrollmentsService.getDueEnrollmentsCount().subscribe(
    (data) => {
      this.duePayments = data;  // Ensure this is a number
      this.updateCards();  // Update cards with the new value
    },
    (error) => {
      console.error('Error fetching Due Payments:', error);
    }
  );
}

// Fetch Gym Programs
fetchPrograms(): void {
  this.programsService.getPrograms().subscribe(
    (data) => {
      this.programs = data;
      this.updateCards(); 
    },
    (error) => {
      console.error('Error fetching programs:', error);
    }
  );
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
            data: [this.countMale, this.countFemale],
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

  fetchMonthlyPayments(): void {
    this.paymentsService.getMonthlyPayments().subscribe(
      (data) => {
        const labels = data.map((item) => item.month); // Extract months
        const amounts = data.map((item) => item.amount); // Extract payment amounts
        this.renderPaymentsChart(labels, amounts);
      },
      (error) => {
        console.error('Error fetching monthly payments:', error);
      }
    );
  }

  renderPaymentsChart(labels: string[], data: number[]): void {
    new Chart('paymentsChart', {
      type: 'line',
      data: {
        labels, // Use dynamic labels
        datasets: [
          {
            label: 'Payments Received',
            data, // Use dynamic data
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.3)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
        },
      },
    });
  }
}
