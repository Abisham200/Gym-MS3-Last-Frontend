import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../../Services/payment.service';
import { User } from '../../../Modals/user';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrl: './user-payments.component.css'
})
export class UserPaymentsComponent {
  
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
          const enrollPayment = {
            memberName: member.firstName + ' ' + member.lastName,
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
      });
  
     
    });
  }
  

  // onPay(entrollmentId: number , amount : number) {
  //  let payment = {
  //     "amount": amount,
  //     "entrollmentId": entrollmentId
  //   }
  //   this.paymentServices.addPayment(payment).subscribe(data =>{
  //     console.log(data);
  //     this.toastr.success('Pay Success');
  //   },err => {
  //     this.toastr.error("Already paid")
  //   })

  //   }


}
