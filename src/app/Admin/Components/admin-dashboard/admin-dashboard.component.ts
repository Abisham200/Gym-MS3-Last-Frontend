import { Component } from '@angular/core';
import {Chart} from 'chart.js/auto';
import { DashboardService } from '../../../Services/dashboard.service';
import { User } from '../../../Modals/user';
import { Program } from '../../../Modals/program';
import { UserService } from '../../../Services/user.service';
import { ProgramService } from '../../../Services/program.service';


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

constructor(private userService : UserService,private programsService : ProgramService)
{}

  ngOnInit() {
    
    this.fetchPrograms();
  
    this.renderPaymentsChart();
    this.userService.loadUsers().subscribe(data => {
     
      this.users = data;
      this.maleUsers=this.users.filter(u=>u.gender==0)
      this.femaleUsers = this.users.filter(u=>u.gender==1)
     this.countMale = this.maleUsers.length
     this.countFemale = this.femaleUsers.length

     this.renderGenderChart();
      this.cards = [
        { title: 'Total Members', value: this.users.length },
        { title: 'Due Payments', value: 15 },
        { title: 'Total Payments Received', value: 50000 },
        { title: 'Gym Programs', value: this.programs.length }
      ];
     
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
