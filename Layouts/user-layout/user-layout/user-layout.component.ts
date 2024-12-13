import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  isSidebarOpen: boolean = true;
userId : number = 0;

  constructor(private router : Router)
  {
   let getUser = localStorage.getItem('user');
   if(getUser){
    let user = JSON.parse(getUser)
    this.userId = user.Id;
   }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    }
    routeProfile(){
      this.router.navigate(['/user/profile' , this.userId])
    }
    routeEnrollments(){
      this.router.navigate(['/user/enrollment' , this.userId])
    }
    routePayments(){
      this.router.navigate(['/user/payment' , this.userId])
    }
    routeNotifications(){
      this.router.navigate(['/user/notifications' , this.userId])
    }
}
