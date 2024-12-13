import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../Modals/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{


  id: number;
  editForm: FormGroup;
  users: User[] =[];

  constructor(private route: ActivatedRoute, 
    private userService: UserService,
    private fb: FormBuilder, private toastr: ToastrService, private router: Router )
  {
    const uid = this.route.snapshot.paramMap.get('id');
    this.id = Number(uid);

    this.editForm = this.fb.group({
      id : [''],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password:[''],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nic: ['', Validators.required],
      age: ['', Validators.required],
      height : [''],
      weight : [''],
      gender: [''],
      userRole: [''],
      address: [''],
      profileImage: ['']
    });
  }
ngOnInit(): void {
  this.userService.loadUsers().subscribe(data => {
     
    this.users = data;
})
this.userService.getUser(this.id).subscribe(data =>{
 
  this.editForm.patchValue(data);
},(error)=>{
  this.toastr.warning("Member is not found!: " + error.error.title);
});
}

onSubmit() {
  const user = this.editForm.value;
  user.id = this.id;

  this.userService.updateUser(user, this.id).subscribe(data => {
    this.toastr.info("Member is updated successfully", "Success");
    this.router.navigate(['/admin/memberManagement']);
});
  
}

onFileSelect($event: Event) {
throw new Error('Method not implemented.');
}


}
