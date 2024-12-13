import { Component } from '@angular/core';
import { enrollment } from '../../../Modals/enrollment';
import { EnrollmentService } from '../../../Services/enrollment.service';
import { ToastrService } from 'ngx-toastr';
import { Program } from '../../../Modals/program';
import { User } from '../../../Modals/user';
import { ProgramService } from '../../../Services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-user-entrollment',
  templateUrl: './user-entrollment.component.html',
  styleUrl: './user-entrollment.component.css'
})
export class UserEntrollmentComponent {
  programs!: Program[];
  memberId: any;
  member!: User;
  alreadyEnrolled: enrollment[] = [];
  notEnrolled!: Program[] 
 
  constructor(private programService: ProgramService, private route: ActivatedRoute, private userService: UserService,
   ) {
    this.memberId = this.route.snapshot.paramMap.get("id");
    console.log(this.memberId);
    this.userService.getUser(this.memberId).subscribe(data => {
      this.member = data;
      this.alreadyEnrolled = this.member.entrollments;


    })

  }
  ngOnInit() {
    this.alreadyEnrolledFunc();
  }

  alreadyEnrolledFunc() 
  {
    this.programService.getPrograms().subscribe(data => {
      this.programs = data
     this.notEnrolled = this.programs.filter(program =>
        !this.alreadyEnrolled.some(enrollment => enrollment.programId == program.id)
      );
      console.log(this.notEnrolled);
    });
  }

}
