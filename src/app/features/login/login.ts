import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/service/auth-service';
import { LoginRequest, RegisterRequest } from '../../shared/models/auth-model';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthForm } from '../../shared/components/auth-form/auth-form';

@Component({
  selector: 'app-login',
  imports: [AuthForm, RouterLink, RouterLinkActive],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  private authService = inject(AuthService);

  onLogin(formData: LoginRequest) {
    this.authService.Login(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/tasks']);
      }
    });
  }
}
