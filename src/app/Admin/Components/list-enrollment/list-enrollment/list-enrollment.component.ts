import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../../Services/enrollment.service';
import { enrollment } from '../../../../Modals/enrollment';
import { User } from '../../../../Modals/user';
import { ProgramService } from '../../../../Services/program.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-enrollment',
  templateUrl: './list-enrollment.component.html',
  styleUrl: './list-enrollment.component.css'
})
export class ListEnrollmentComponent implements OnInit {
  enrollments: enrollment[] = [];
  searchText: string = '';

  constructor(private enrollmentService: EnrollmentService, private toaster : ToastrService) {

  }
  getPrograms(){

  }
  ngOnInit(): void {
    // Fetch enrollments from the service
    this.fetchEnrollments();
  }

  fetchEnrollments(): void {
    this.enrollmentService.getEnrollments().subscribe(data =>
      {
        this.enrollments = data;
        console.log(data);
      });
      
  }

  // Edit action for enrollments
  onEdit(enrollmentId: number): void {
    console.log(`Edit enrollment with ID: ${enrollmentId}`);
    // Navigate to edit page or open modal for editing (implement navigation logic)
  }

  // Delete action for enrollments
  onDelete(id : number) {
    this.enrollmentService.deleteEnrollment(id).subscribe(data => {
      
      console.log(data);
      if(data){
        this.toaster.success('Enroll deleted');
        this.fetchEnrollments();
      }
      },err => {
        this.toaster.error("Error")
    })
    }
}