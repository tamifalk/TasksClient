import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '../../shared/models/auth-model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  private _user = signal<AuthUser | null>(null);
  user$ = this._user.asReadonly();

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        this._user.set(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }

  Register(request: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._user.set(res.user);
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
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._user.set(res.user);
        },
        error: (err) => {
          //create a commponnent to show error messages
        }
      })
    );
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._user.set(null);
  }

}
