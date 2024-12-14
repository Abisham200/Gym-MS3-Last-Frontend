import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { UserService } from '../../../../Services/user.service';
import { ProgramService } from '../../../../Services/program.service';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { PaymentService } from '../../../../Services/payment.service';



interface CustomChartData {
  data: number[];
  label: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  // Declare arrays for data
  receivedPayments: any[] = [];
  duePayments: any[] = [];
  recentRegistrations: any[] = [];
  recentEnrollments: any[] = [];
  programs: any[] = [];
  users: any[] = [];

  // Declare chart data
  receivedPaymentsData: CustomChartData[] = [];
  duePaymentsData: CustomChartData[] = [];

  // Declare card data
  totalPaymentsReceived: number = 0;
  totalPendingPayments: number = 0;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private programService: ProgramService
  ) {}

  ngOnInit(): void {
    this.loadReceivedPayments();
    this.loadDuePayments();
    this.loadRecentRegistrations();
    this.loadRecentEnrollments();
    this.loadPrograms();
    this.loadUsers();
  }

  loadReceivedPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        this.receivedPayments = data.filter((payment) => payment.status === 'Received');
        // Update total payments received
        this.totalPaymentsReceived = this.receivedPayments.reduce(
          (total, payment) => total + payment.amount,
          0
        );
        // Update chart data for received payments
        this.receivedPaymentsData = [
          {
            data: this.receivedPayments.map((p) => p.amount),
            label: 'Amount Received',
            backgroundColor: '#007bff',
          },
        ];
      },
      (error) => console.error('Error loading received payments:', error)
    );
  }

  loadDuePayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        this.duePayments = data.filter((payment) => payment.status === 'Due');
        // Update total pending payments
        this.totalPendingPayments = this.duePayments.reduce(
          (total, payment) => total + payment.amount,
          0
        );
        // Update chart data for due payments
        this.duePaymentsData = [
          {
            data: this.duePayments.map((d) => d.amount),
            label: 'Due Amount',
            backgroundColor: '#dc3545',
          },
        ];
      },
      (error) => console.error('Error loading due payments:', error)
    );
  }

  loadRecentRegistrations(): void {
    this.userService.loadUsers().subscribe((data) => {
      const currentMonth = new Date().getMonth() + 1;
      this.recentRegistrations = data.filter(
        (user) => new Date(user.creationDate).getMonth() + 1 === currentMonth
      );
    });
  }

  loadRecentEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe((data) => {
      this.recentEnrollments = data.filter(
        (enrollment) => new Date(enrollment.createdDate).getFullYear() === new Date().getFullYear()
      );
    });
  }

  loadPrograms(): void {
    this.programService.getPrograms().subscribe((data) => {
      this.programs = data;
    });
  }

  loadUsers(): void {
    this.userService.loadUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
