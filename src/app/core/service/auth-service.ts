import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '../../shared/models/auth-model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';
  private router = inject(Router);

  private _user = signal<AuthUser | null>(null);
  user$ = this._user.asReadonly();
  isReady = signal(false)

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('token');
    if (!token)
    {
      this.isReady.set(true);
      return;
    }

    this.http.get<AuthUser>(`${this.apiUrl}/me`).subscribe({
      next: (user) => {
        this._user.set(user);
        this.isReady.set(true);
      },
      error: () => {
        this.Logout();
        this.isReady.set(true);
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this._user();
  }
  Register(request: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap({
        next: (res) => {
          const user: AuthUser = {
            ...res.user,
            role: 'user'
          };
          localStorage.setItem('token', res.token);
          this._user.set(user);
          this.isReady.set(true);
        },
        error: (err) => {
          
          //create a commponnent to show error messages
        }
      })
    );
  }

  Login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap({
        next: (res) => {
          const user: AuthUser = {
            ...res.user,
            role: 'user'
          };
          localStorage.setItem('token', res.token);
          this._user.set(user);
          this.isReady.set(true);
        },
        error: (err) => {
          //create a commponnent to show error messages
        }
      })
    );
  }

  Logout() {
    localStorage.removeItem('token');
    this._user.set(null);
    //navigate to home page
    this.router.navigate(['/login']);
  }

}
