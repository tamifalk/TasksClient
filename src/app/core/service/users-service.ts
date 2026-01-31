import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../shared/models/auth-model';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;
  

  private _users = signal<UserResponse[]>([]);
  users$ = this._users.asReadonly();

  getUsers() {
    return this.http.get<UserResponse[]>(this.apiUrl).pipe(
      tap({
        next: (users) => {
          this._users.set(users);
        },
      })
    );
  }
}
