import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DashboardService } from '../../../Services/dashboard.service';
import { User } from '../../../Modals/user';
import { Program } from '../../../Modals/program';
import { UserService } from '../../../Services/user.service';
import { ProgramService } from '../../../Services/program.service';
import { PaymentService } from '../../../Services/payment.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { enrollment } from '../../../Modals/enrollment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  users: User[] = [];
  maleUsers: User[] = [];
  femaleUsers: User[] = [];
  countMale: number = 0;
  countFemale: number = 0;
  length!: number;
  programs!: Program[];
  cards: any;

  totalPaymentsReceived: number = 0;
  duePayments: number = 0;
  totalPay:enrollment[]=[];
  totalPayCount:number=0;

  constructor(
    private userService: UserService,
    private programsService: ProgramService,
    private paymentService: PaymentService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.getTotalPayCount();
    this.fetchPrograms();
    this.fetchPaymentsData();
    this.userService.loadUsers().subscribe((data) => {
      this.users = data;
      this.maleUsers = this.users.filter((u) => u.gender === 0);
      this.femaleUsers = this.users.filter((u) => u.gender === 1);
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

  getTotalPayCount()
  {
    this.enrollmentService.getEnrollments().subscribe(data=>{
      this.totalPay = data
      this.totalPayCount = this.totalPay.length
      console.log(this.totalPayCount)
      this.updateCards();
    })
  }

  fetchPaymentsData(): void {
    this.paymentService.getAllPayments().subscribe((payments) => {
      this.totalPaymentsReceived = payments.reduce(
        (sum, payment) => sum + payment.amount,
        0
      );
      this.updateCards();
    });

    this.paymentService.getDuePayment().subscribe((data: any) => {
      this.duePayments = data;
      this.updateCards();
    });
  }

  updateCards(): void {

    console.log('value :' ,this.totalPayCount - this.duePayments )
    this.cards = [
      { title: 'Total Members', value: this.users.length },
      { title: 'Due Payments', value:this.totalPayCount - this.duePayments },
      { title: 'Total Payments Received', value: this.totalPaymentsReceived },
      { title: 'Gym Programs', value: this.programs.length },
    ];
  }

  renderGenderChart(): void {
    new Chart('genderChart', {
      type: 'bar',
      data: {
        labels: ['Male Members', 'Female Members'],
        datasets: [
          {
            label: 'Members Count',
            data: [this.countMale, this.countFemale],
            backgroundColor: [
              'rgba(0, 123, 255, 0.7)',
              'rgba(220, 53, 69, 0.7)',
            ],
            borderColor: ['#007bff', '#dc3545'],
            borderWidth: 2,
            borderRadius: 10, // Rounded bars
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (context) => `${context.raw} Members`,
            },
          },
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutBounce', // Smooth animation
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#343a40' },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            ticks: { color: '#343a40' },
          },
        },
      },
    });
  }

  fetchMonthlyPayments(): void {
    this.paymentService.getMonthlyPayments().subscribe(
      (data: any[]) => {
        const months = Array(12).fill(0);

        data.forEach((item) => {
          months[item.month - 1] = item.totalAmount;
        });

        const labels = this.getMonthNames();
        const amounts = months;

        this.renderPaymentsChart(labels, amounts);
      },
      (error) => {
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
            backgroundColor: this.createGradient(),
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#28a745',
            pointBorderColor: '#ffffff',
            pointRadius: 5, // Add dots to data points
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = Number(context.raw); 
                return `$${value.toFixed(2)}`; 
              },
            },
          },
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutSine',
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#343a40' },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            ticks: { color: '#343a40' },
          },
        },
      },
    });
  }

  createGradient(): CanvasGradient {
    const ctx = (document.getElementById('paymentsChart') as HTMLCanvasElement)
      .getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(40, 167, 69, 0.6)');
    gradient.addColorStop(1, 'rgba(40, 167, 69, 0.1)');
    return gradient;
  }

  getMonthNames(): string[] {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }
}
