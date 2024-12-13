import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { UserService } from '../../../../Services/user.service';
import { ProgramService } from '../../../../Services/program.service';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { PaymentService } from '../../../../Services/payment.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  
  receivedPayments: any[] = [
    { name: 'John Doe', id: 101, contact: '1234567890', amount: 100, date: '2024-12-01' },
    { name: 'Jane Smith', id: 102, contact: '9876543210', amount: 200, date: '2024-12-02' },
  ];
  duePayments: any[] = [
    { name: 'Alice Brown', id: 201, amount: 150, date: '2024-12-05' },
    { name: 'Bob White', id: 202, amount: 300, date: '2024-12-10' },
  ];
  recentRegistrations: any[] = [];
  recentEnrollments: any[] = [];
  programs: any[] = [];
  users: any[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private paymentService: PaymentService,
    private programService: ProgramService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadReceivedPayments();
    this.loadDuePayments();
    this.loadRecentRegistrations();
    this.loadRecentEnrollments();
    this.loadPrograms();
    this.loadUsers();
  }

  // Load data dynamically
  loadReceivedPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        this.receivedPayments = data.filter(payment => payment.status === 'Received');
      },
      (error) => console.error('Error loading received payments:', error)
    );
  }

  loadDuePayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        this.duePayments = data.filter(payment => payment.status === 'Due');
      },
      (error) => console.error('Error loading due payments:', error)
    );
  }

  loadRecentRegistrations(): void {
    this.userService.loadUsers().subscribe(
      (data) => {
        const currentMonth = new Date().getMonth() + 1;
        this.recentRegistrations = data.filter(
          user => new Date(user.creationDate).getMonth() + 1 === currentMonth
        );
      },
      (error) => console.error('Error loading recent registrations:', error)
    );
  }

  loadRecentEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe(
      (data) => {
        this.recentEnrollments = data.filter(enrollment =>
          new Date(enrollment.createdDate).getFullYear() === new Date().getFullYear()
        );
      },
      (error) => console.error('Error loading recent enrollments:', error)
    );
  }

  loadPrograms(): void {
    this.programService.getPrograms().subscribe(
      (data) => this.programs = data,
      (error) => console.error('Error loading programs:', error)
    );
  }

  loadUsers(): void {
    this.userService.loadUsers().subscribe(
      (data) => this.users = data,
      (error) => console.error('Error loading users:', error)
    );
  }

  // Add enrollment functionality
  addEnrollment(newEnrollment: any): void {
    this.enrollmentService.addEnrollment(newEnrollment).subscribe(
      (response) => {
        console.log('Enrollment added successfully:', response);
        this.loadRecentEnrollments(); // Refresh the enrollments
      },
      (error) => console.error('Error adding enrollment:', error)
    );
  }

  // Chart Data
  receivedPaymentsLabels: string[] = this.receivedPayments.map((p) => p.name);
  receivedPaymentsData = [
    {
      data: this.receivedPayments.map((p) => p.amount),
      label: 'Amount Received',
      backgroundColor: '#007bff',
    },
  ];

  duePaymentsLabels: string[] = this.duePayments.map((d) => d.name);
  duePaymentsData = [
    {
      data: this.duePayments.map((d) => d.amount),
      label: 'Due Amount',
      backgroundColor: '#dc3545',
    },
  ];

  // Chart Options
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

}
