import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CommentRequest, CommentResponse } from '../../shared/models/comments-model';
import { tap } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/comments';

  getCommentsByTaskId(taskId: number) {
    const params = new HttpParams().set('taskId', taskId);
    return this.http.get<CommentResponse[]>(this.apiUrl, { params }).pipe(
      tap({
        error: (err) => {
          //create a component to show error messages
        }
      })
    );

  }

  addCommentToTask(comment: CommentRequest) {
    return this.http.post<CommentResponse>(this.apiUrl, comment).pipe(
      tap({
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }
}
