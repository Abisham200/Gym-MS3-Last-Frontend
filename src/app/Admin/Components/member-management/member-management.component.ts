import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { Gender, User } from '../../../Modals/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrl: './member-management.component.css'
})
export class MemberManagementComponent implements OnInit {
 
  searchText: string = '';
  members! : User[] ;
  
  
  constructor(private userServices : UserService, private toastr : ToastrService,
    private router: Router, )
  {}

  ngOnInit(): void {
     this.loadUsers();
  }
  
    onDelete(id: number) {
      if(confirm('Do you want to delete?')) {
        this.userServices.deleteUser(id).subscribe(data => {
          this.toastr.success('User is deleted', "Deleted", {
            timeOut: 10000,
            closeButton: true
          });
        });
        this.loadUsers();
      }
    }

    loadUsers(){
      this.userServices.loadUsers().subscribe(data => {
        this.members = data;
      })
    }
  
    onEdit(id: number) {
      this.router.navigate(['/admin/memberRegister', id])
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
