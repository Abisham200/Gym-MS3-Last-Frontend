import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { Gender, User } from '../../../Modals/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EditMemberComponent } from '../edit-member/edit-member/edit-member.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Import NgbModal
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrl: './member-management.component.css'
})
export class MemberManagementComponent implements OnInit {
  searchText: string = '';
  members!: User[];
  paginatedMembers!: User[];

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  constructor(
    private userServices: UserService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal 
  ) {}

  loadUsers() {
    this.userServices.loadUsers().subscribe((data) => {
      this.members = data;
      this.calculatePagination(); // Calculate pagination after loading users
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  onDelete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this User?');
  
    if (confirmation) {
      // Proceed with the deletion if confirmed
      this.userServices.deleteUser(id).subscribe(
        data => {
          console.log(data);
          this.toastr.success('User deleted successfully');
          this.loadUsers(); // Refresh the enrollment list
        },
        error => {
          console.error(error);
          this.toastr.error('Error deleting User');
        }
      );
    } else {
      this.toastr.info('Deletion cancelled');
    }
  }
  

  onEdit(id: number) {
    this.router.navigate(['/admin/memberRegister', id]);
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.members.length / this.pageSize);
    this.paginatedMembers = this.members.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.calculatePagination();
    }
  }

  openEditModal(member: User) {
   // const modalRef = this.modalService.open(UserEditComponent);
    //modalRef.componentInstance.member = member; // Pass the member details to the modal
  }
  // editMember(id: number) {
  //   alert(`Edit Member with ID: ${id}`);
  //   // Add your navigation or modal logic here
  // }

  // deleteMember(id: number) {
  //   const confirmed = confirm('Are you sure you want to delete this member?');
  //   if (confirmed) {
  //     this.members = this.members.filter((member) => member.id !== id);
  //   }
  // }
  // members: any[] = [];

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.getMembers();
  // }

  // getMembers(): void {
  //   this.http.get<any[]>('https://api.example.com/members').subscribe(
  //     (data: any[]) => {
  //       this.members = data;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching members', error);
  //     }
  //   );
  // }

 
}
