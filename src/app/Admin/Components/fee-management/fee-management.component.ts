import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Modals/user';
import { PaymentService } from '../../../Services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fee-management',
  templateUrl: './fee-management.component.html',
  styleUrl: './fee-management.component.css', 
})
export class FeeManagementComponent implements OnInit {

  searchText: any;
  constructor(private userService: UserService, private paymentServices : PaymentService, private toastr : ToastrService) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  members!: User[];
  enrollPayments: any[] = [];
  paginatedPayments: any[] = []; // New: Holds current page data
  currentPage: number = 1; // New: Current page
  pageSize: number = 10; // New: Number of items per page
  totalPages: number = 0; // New: Total number of pages

  loadUsers() {
    this.userService.loadUsers().subscribe((data) => {
      this.members = data;
      this.members.forEach((member) => {
        member.entrollments.forEach((enrollment) => {
          let enrollPayment = {
            memberName: member.firstName +" " + member.lastName,
            programName: enrollment.program.name,
            entrollmentId: enrollment.id,
            amount: enrollment.program.pricePerMonth,
          };
          this.enrollPayments.push(enrollPayment);
        });
        // console.log(this.enrollPayments);
      });
      // New: Calculate pagination after loading users
      this.calculatePagination();
    });
  }

  onPay(entrollmentId: number , amount : number) {
   let payment = {
      "amount": amount,
      "entrollmentId": entrollmentId
    }
    this.paymentServices.addPayment(payment).subscribe(data =>{
      console.log(data);
      this.toastr.success('Pay Success');
    },err => {
      this.toastr.error("Already paid")
    })

    }


    calculatePagination() {
      this.totalPages = Math.ceil(this.enrollPayments.length / this.pageSize);
      this.paginate();
    }

    paginate() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedPayments = this.enrollPayments.slice(startIndex, endIndex);
    }
  
    // New: Handle page changes
    changePage(page: number) {
      if (page < 1 || page > this.totalPages) {
        return; // Prevent invalid page numbers
      }
      this.currentPage = page;
      this.paginate();
    }

}
