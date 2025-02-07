import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/ui/button.component';
import { InputComponent } from '../../../shared/ui/input.component';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    LucideAngularModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginContainer') loginContainer!: ElementRef;
  @ViewChild('particleContainer') particleContainer!: ElementRef;
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

  // Änderung von ngOnInit zu ngAfterViewInit
  ngAfterViewInit() {
    // Kurze Verzögerung, um sicherzustellen, dass die View vollständig gerendert ist
    setTimeout(() => {
      this.initParticleAnimation();
      this.initLoginCardAnimation();
    });
  }

  initParticleAnimation() {
    // Sicherheitsüberprüfung hinzugefügt
    if (!this.particleContainer?.nativeElement) {
      console.warn('Particle container not found');
      return;
    }

    const container = this.particleContainer.nativeElement;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle', 'absolute', 'rounded-full', 'opacity-50');
      container.appendChild(particle);

      gsap.set(particle, {
        x: () => gsap.utils.random(0, container.offsetWidth),
        y: () => gsap.utils.random(0, container.offsetHeight),
        scale: () => gsap.utils.random(0.1, 1),
        backgroundColor: () => `hsla(${gsap.utils.random(0, 360)}, 70%, 50%, 0.5)`,
        width: () => gsap.utils.random(2, 10),
        height: () => gsap.utils.random(2, 10)
      });

      gsap.to(particle, {
        duration: () => gsap.utils.random(5, 15),
        x: () => gsap.utils.random(0, container.offsetWidth),
        y: () => gsap.utils.random(0, container.offsetHeight),
        opacity: 0,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }

  initLoginCardAnimation() {
    // Sicherheitsüberprüfung hinzugefügt
    if (!this.loginContainer?.nativeElement) {
      console.warn('Login container not found');
      return;
    }

    gsap.fromTo(
      this.loginContainer.nativeElement,
      { 
        opacity: 0, 
        rotationX: 90,
        scale: 0.8 
      },
      { 
        opacity: 1, 
        rotationX: 0,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)'
      }
    );
  }

  // Bestehende Methoden
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