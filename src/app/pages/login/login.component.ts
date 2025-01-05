import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';  
  successMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('Form submitted');
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      
      this.authService.login({ email, password }).subscribe(
        (response) => {
          console.log('Login Response:', response);
          localStorage.setItem('userId', response.data.user.id);
          console.log('userId', response.data.user.id);
          localStorage.setItem('token', response.data.token);
          this.successMessage = response.message; 
          this.errorMessage = '';
          this.loginForm.reset(); 
          this.router.navigate(['/home']);
        },
        (error) => {
          this.errorMessage = error.error.message; 
          this.successMessage = '';
        }
      );
    }
  }
}
