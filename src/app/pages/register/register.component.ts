import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
 // imports: [CommonModule],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';  
  successMessage: string = '';
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator } 
    );
  }


  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };  
  }

  
  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;

     
      this.authService.register({ username, email, password }).subscribe(
        (response) => {
          this.successMessage = response.message;
          this.errorMessage = '';
          this.registerForm.reset();
          setTimeout(() => this.router.navigate(['/login']), 2000); 
        },
        (error) => {
          this.errorMessage = error.error.message; 
          this.successMessage = '';
        }
      );
    }
  }
}
