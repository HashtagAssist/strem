import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/ui/button.component';
import { InputComponent } from '../../../shared/ui/input.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return `${field} ist erforderlich`;
    if (control.errors['email']) return 'Ungültige E-Mail-Adresse';
    if (control.errors['minlength']) return 'Passwort muss mindestens 4 Zeichen lang sein';

    return '';
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login fehlgeschlagen:', error);
        this.loading = false;
      }
    });
  }
} 