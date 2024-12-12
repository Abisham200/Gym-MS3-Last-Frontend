import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../../Services/payment.service';
import { User } from '../../../Modals/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrl: './user-payments.component.css'
})
export class UserPaymentsComponent {
  memberId : any
  members!: User[];
  enrollPayments: any[] = [];
  member!:User;
  
  constructor(private userService: UserService, private paymentServices : PaymentService, private toastr : ToastrService, private route : ActivatedRoute) {
    this.memberId = this.route.snapshot.paramMap.get("id");
    console.log(this.memberId);
   
}
  ngOnInit(): void {
    this.getPayments();
  }
  

  getPayments() {
    this.userService.getUser(this.memberId).subscribe((data) => {
      this.member = data;
  
      //this.members.forEach((member) => {
        this.member.entrollments.forEach((enrollment) => {
          const enrollPayment = {
            memberName: this.member.firstName + ' ' + this.member.lastName,
            programName: enrollment.program.name,
            entrollmentId: enrollment.id,
            amount: enrollment.program.pricePerMonth,
            paid: false, // Initialize as unpaid
          };
  
          // Check if payment exists for this enrollment
          this.paymentServices.getPaymentByEnroll(enrollment.id).subscribe(
            (payment) => {
              if (payment) {
                enrollPayment.paid = true;
              }
            },
            (err) => {
              console.log(`No payment found for enrollment ID: ${enrollment.id}`);
            }
          );
  
          this.enrollPayments.push(enrollPayment);
        });
      //});
  
     
    });
  }



}
