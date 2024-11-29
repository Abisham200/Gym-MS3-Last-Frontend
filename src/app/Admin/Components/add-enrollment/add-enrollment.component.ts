import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../../Services/program.service';
import { Program } from '../../../Modals/program';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../Modals/user';
import { UserService } from '../../../Services/user.service';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-enrollment',
  templateUrl: './add-enrollment.component.html',
  styleUrl: './add-enrollment.component.css'
})
export class AddEnrollmentComponent implements OnInit {
  programs!: Program[];
  memberId: any;
  member!: User;
  constructor(private programService: ProgramService, private route: ActivatedRoute, private userService: UserService,
     private enrollmentService : EnrollmentService, private toaster : ToastrService, private router : Router) {
    this.memberId = this.route.snapshot.paramMap.get("id");
    console.log(this.memberId);
    this.userService.getUser(this.memberId).subscribe(data => {
      console.log(data)
    })

  }
  ngOnInit() {
    this.programService.getPrograms().subscribe(data => this.programs = data)
  }
  onSubmit() {
    let checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');
    console.log(checkedBoxes);
    let values: any[] = [];
    checkedBoxes.forEach(function (checkbox: any) {
      values.push(parseInt(checkbox.value));
    });

   console.log(values)

   let enrollRequest = {
    userId : this.memberId,
    programs : values
   }
   this.enrollmentService.addEnrollment(enrollRequest).subscribe(data => {
    this.toaster.success('Programs Enrolled Successfully');
    this.router.navigate(['/admin/memberManagement'])
    console.log(data);
   })
  }
}
