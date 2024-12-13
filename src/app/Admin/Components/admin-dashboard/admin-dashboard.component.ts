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
cards:any

totalPaymentsReceived: number = 0;
  duePayments: number = 0;

constructor(private userService : UserService,private programsService : ProgramService ,
   private paymentSercive: PaymentService , private enrollmentSerivce : EnrollmentService)
{}
  
    ngOnInit(): void {
      this.fetchPrograms();
      this.fetchPaymentsData();
      this.userService.loadUsers().subscribe((data) => {
        this.users = data;
        this.maleUsers = this.users.filter((u) => u.gender == 0);
        this.femaleUsers = this.users.filter((u) => u.gender == 1);
        this.countMale = this.maleUsers.length;
        this.countFemale = this.femaleUsers.length;
  
        this.renderGenderChart();
        this.fetchMonthlyPayments();
        this.updateCards();
      });
    }
  
    fetchPrograms(): void {
      this.programsService.getPrograms().subscribe(
        (data) => {
          this.programs = data;
        },
        (error) => {
          console.error('Error fetching programs:', error);
        }
      );
    }
  
    fetchPaymentsData(): void {
      // Fetch the total payments received
      this.paymentSercive.getAllPayments().subscribe((payments) => {
        this.totalPaymentsReceived = payments.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );
        this.updateCards();
      });
  
      // Fetch due payments count
      this.paymentSercive.getDuePayment().subscribe((data: any) => {
        this.duePayments = data.count;
        this.updateCards();
      });
    }
  
    updateCards(): void {
      this.cards = [
        { title: 'Total Members', value: this.users.length },
        { title: 'Due Payments', value: this.duePayments },
        { title: 'Total Payments Received', value: this.totalPaymentsReceived },
        { title: 'Gym Programs', value: this.programs.length },
      ];
    }
  
    renderGenderChart() {
      new Chart('genderChart', {
        type: 'bar',
        data: {
          labels: ['Male Members', 'Female Members'],
          datasets: [
            {
              label: 'Members Count',
              data: [this.countMale, this.countFemale],
              backgroundColor: ['#007bff', '#dc3545'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
          },
        },
      });
    }
  
    fetchMonthlyPayments(): void {
      this.paymentSercive.getMonthlyPayments().subscribe(
        (data: any[]) => {
          // Create an array with all months initialized to zero
          const months = Array(12).fill(0); // Represents payments for Jan to Dec
    
          // Populate the months array with data from the API
          data.forEach(item => {
            months[item.month - 1] = item.totalAmount; // Month is 1-based, adjust index
          });
    
          // Generate labels and amounts
          const labels = this.getMonthNames();
          const amounts = months;
    
          // Render the chart with all months
          this.renderPaymentsChart(labels, amounts);
        },
        error => {
          console.error('Error fetching payment data:', error);
        }
      );
    }
    
    renderPaymentsChart(labels: string[], data: number[]): void {
      new Chart('paymentsChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Payments Received',
              data: data,
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
    
    getMonthNames(): string[] {
      return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    }
}
