import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CommentRequest, CommentResponse } from '../../shared/models/comments-model';
import { tap } from 'rxjs';
import { AuthService } from './auth-service';
import { NotificationService } from './notification-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private notify = inject(NotificationService);
  private apiUrl = `${environment.apiUrl}/comments`;

  private _comments = signal<CommentResponse[]>([]);
  comments$ = this._comments.asReadonly();

  getCommentsByTaskId(taskId: number) {
    const params = new HttpParams().set('taskId', taskId);
    return this.http.get<CommentResponse[]>(this.apiUrl, { params }).pipe(
      tap({
        next: (comments) => this._comments.set(comments),
        })
    );
  }

  addCommentToTask(comment: CommentRequest) {
    return this.http.post<CommentResponse>(this.apiUrl, comment).pipe(
      tap({
        next: (newComment) => {
          this._comments.update((comments) => [...comments, newComment]);
          this.notify.showSuccess('Comment added successfully');
        },
      })
    );
  }
}
