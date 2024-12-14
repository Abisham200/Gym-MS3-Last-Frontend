import { Component } from '@angular/core';
import { User } from '../../../Modals/user';
import { UserService } from '../../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

  export class UserProfileComponent {
    user!: User;
    uid: number = 0;
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private toastr: ToastrService // For notifications
    ) {}
  
    ngOnInit(): void {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        this.uid = Number(userId);
        this.getUserDetails(this.uid);
      }
    }
  
    getUserDetails(id: number): void {
      this.userService.getUser(id).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.toastr.error('Failed to load user details.', 'Error');
        }
      );
    }
  
    updateUserDetails(): void {
      // Create a new user object that includes only editable fields
      const updatedUser = {
        ...this.user,
        gender: this.user.gender,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        contactNumber: this.user.contactNumber,
        weight: this.user.weight,
        height: this.user.height,
        address: this.user.address,
      };
  
      // Call the update service
      this.userService.updateUser(updatedUser, this.uid).subscribe(
        () => {
          // Show success notification using Toastr
          this.toastr.success('User details updated successfully!', 'Success');
        },
        (error) => {
          // Show error notification using Toastr
          console.error('Error updating user details:', error);
          this.toastr.error('Failed to update user details. Please try again later.', 'Error');
        }
      );
    }
  }
  
