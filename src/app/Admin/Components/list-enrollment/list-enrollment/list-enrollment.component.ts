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
  searchText: string = '';paginatedEnrollments: enrollment[] = []; // Holds the current page data
  currentPage: number = 1; // Current page
  pageSize: number = 10; // Number of items per page
  totalPages: number = 0; // Total number of pages

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
        // console.log(data);
        this.calculatePagination();
      });
      
  }

   // Calculate total pages for pagination
   calculatePagination() {
    this.totalPages = Math.ceil(this.enrollments.length / this.pageSize);
    this.paginate();
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEnrollments = this.enrollments.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return; // Prevent invalid page numbers
    }
    this.currentPage = page;
    this.paginate();
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