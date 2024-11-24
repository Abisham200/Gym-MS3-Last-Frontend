import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-member-register',
  templateUrl: './member-register.component.html',
  styleUrl: './member-register.component.css'
})

  export class RegisterMemberComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
      this.initializeForm();
    }
  
    initializeForm(): void {
      this.registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
        confirmPassword: ['', Validators.required],
        nic: ['', Validators.required],
        age: ['', Validators.required],
        gender: [''],
        userRole: ['user'],
        address: [''],
        profileImage: [null]
      }, { validator: this.passwordMatchValidator });
  
      // Reset form state on initialization
      this.registerForm.reset();
    }
  
  
    onSubmit() {
      if (this.registerForm.valid) {
        console.log(this.registerForm.value);
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

