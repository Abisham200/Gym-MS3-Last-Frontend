import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../Services/user.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {



loginForm: FormGroup<any>;

constructor(private fb : FormBuilder, private userService : UserService, private router : Router , private toastr : ToastrService)
{
  this.loginForm = this.fb.group({
    email: [""],
    password:[""],
  })
}

  onLogIn(){
    console.log(this.loginForm.value);
    this.userService.logIn(this.loginForm.value).subscribe(data => {
      localStorage.setItem('token' , data.token);
      if (data) {
        const decoded: any = jwtDecode(data.token);
        localStorage.setItem('user', JSON.stringify(decoded)); 
       if (decoded.Role == "Member") {

        this.toastr.success("Welcome " + decoded.FirstName + " " + decoded.LastName +"!!!");
        this.router.navigate(['/user/profile/',decoded.Id])
      } else if (decoded.Role != "Member") {
        this.router.navigate(['/admin/dashboard']);
        this.toastr.success("Welcome Admin!!!");
      }
    } 
  },(error)  => {
    this.toastr.error(error.error);
  }
);
    
  } 
 }
