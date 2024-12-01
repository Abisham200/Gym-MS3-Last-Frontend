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

  loadUsers() {
    this.userService.loadUsers().subscribe((data) => {
      this.members = data;
      this.members.forEach((member) => {
        member.entrollments.forEach((enrollment) => {
          let enrollPayment = {
            memberName: member.firstName,
            programName: enrollment.program.name,
            entrollmentId: enrollment.id,
            amount: enrollment.program.pricePerMonth,
          };
          this.enrollPayments.push(enrollPayment);
        });
        console.log(this.enrollPayments);
      });
    });
  }

  onPay(entrollmentId: number , amount : number) {
   let payment = {
      "amount": amount,
      "entrollmentId": entrollmentId
    }
    this.paymentServices.addPayment(payment).subscribe(data =>{
      console.log(data);
    },err => {
      this.toastr.error("Already paid")
    })

    }

}
