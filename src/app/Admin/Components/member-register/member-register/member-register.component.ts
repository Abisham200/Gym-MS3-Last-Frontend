import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-register',
  templateUrl: './member-register.component.html',
  styleUrl: './member-register.component.css'
})

  export class RegisterMemberComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private fb: FormBuilder, private userServices : UserService, private toastr : ToastrService, private router : Router) {}

    ngOnInit(): void {
      this.initializeForm();
    }
  
    initializeForm(): void {
      this.registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
        confirmPassword: ['', Validators.required],
        nic: ['', Validators.required],
        age: ['', Validators.required],
        height : [''],
        weight : [''],
        gender: [''],
        role: [''],
        address: [''],
        profileImage: ['']
      }, { validator: this.passwordMatchValidator });
  
      // Reset form state on initialization
      this.registerForm.reset();

      if (this.registerForm.valid) {
        // Prepare data for the API
        const formData = { 
          ...this.registerForm.value, 
          role: parseInt(this.registerForm.value.role),
          gender: parseInt(this.registerForm.value.gender),
        };
      
        this.userServices.registerUser(formData).subscribe(
          (response) => {
            this.toastr.success("Successfully Registered");
            this.router.navigate(['/admin/memberManagement']);
          },
          (error) => {
            this.toastr.error(error.error || "Registration failed. Please try again.");
          }
        );
      }
      //  else {
      //   this.toastr.error("Please fill out all required fields correctly.");
      // }
      
    }
  
  
    onSubmit() {
      if (this.registerForm.valid) {
        console.log(this.registerForm.value);
        this.registerForm.value.role = parseInt(this.registerForm.value.role);
        this.registerForm.value.gender = parseInt(this.registerForm.value.gender)
        this.userServices.registerUser(this.registerForm.value).subscribe(data =>{
          if(this.userServices.isLoggedIn()){
            this.toastr.success("Succesfully Registered")
          this.router.navigate(['/admin/memberManagement'])
          } 
        }
        ,(error)  => 
          {
          this.toastr.error(error.error);}
      );

      }
    }
  
    isFieldInvalid(field: string): boolean {
      const control = this.registerForm.get(field);
      return control ? control.invalid && (control.dirty || control.touched) : false;
    }
  
    onFileSelect(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.registerForm.patchValue({ profileImage: file });
      }
    }

      clearErrorMessage(field: string): void {
    const control = this.registerForm.get(field);
    if (control?.dirty || control?.touched) {
      control.markAsUntouched();
    }
  }
  
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  
  
  
  
  }

