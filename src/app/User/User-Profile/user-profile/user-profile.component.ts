import { Component } from '@angular/core';
import { User } from '../../../Modals/user';
import { UserService } from '../../../Services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

  export class UserProfileComponent {
    user: User = {} as User;
    userId!: number;
  
    constructor(private userService: UserService, private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      // Get user ID from route
      this.userId = +this.route.snapshot.paramMap.get('id')!;
      this.loadUser();
    }
  
    loadUser(): void {
      this.userService.getUser(this.userId).subscribe({
        next: (data: User) => {
          this.user = data;
        },
        error: (err) => console.error('Error loading user:', err)
      });
    }
  
    updateUser(): void {
      this.userService.updateUser(this.user, this.userId).subscribe({
        next: () => {
          alert('User updated successfully!');
        },
        error: (err) => console.error('Error updating user:', err)
      });
    }
  
    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        // Logic to handle image upload (can integrate with your file upload service)
        alert('Image uploaded: ' + file.name);
        // Example logic for file upload: Update the user profile image after upload
        // this.user.profileImage = file;
      }
    }
  }
  
