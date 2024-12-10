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
    user!: User;
    uid: number | undefined;

    constructor(private route: ActivatedRoute, private userService: UserService) {}
  
    ngOnInit(): void {

      
      const userId = this.route.snapshot.paramMap.get('id');
      console.log(userId)
      if (userId) {
        this.uid = Number(userId)
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
        }
      );
    }
  }
  
