import { Component, inject, input, output, signal } from '@angular/core';
import { CommentsService } from '../../core/service/comments-service';
import { CommentRequest, CommentResponse } from '../../shared/models/comments-model';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLabel, MatError, MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { AuthService } from '../../core/service/auth-service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comments',
  imports: [DatePipe, MatLabel, ReactiveFormsModule, MatError, MatFormField, UpperCasePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  commentService = inject(CommentsService);
  authService = inject(AuthService);
  commentsOpen = output<void>();
  commentClose = output<void>();
  authservice = inject(AuthService);
  currntUser= this.authservice.user$;

  comments = signal<CommentResponse[]>([]);
    
  commentText = new FormControl('', [Validators.required]);
  taskId = input.required<number>();

  ngOnInit() {
    this.commentService.getCommentsByTaskId(this.taskId()).subscribe(data => {
      this.comments.set(data);
    });
  }
  onSubmit() {
    if (this.commentText.valid) {
      const newComment: CommentRequest = {
        taskId: this.taskId(),
        body: this.commentText.value as string
      };
      this.commentService.addCommentToTask(newComment).subscribe(savedComment => {
        const enriched = { 
          ...savedComment, 
          author_name: this.authService.user$()?.name || 'Me' 
        };
        this.comments.update(all => [...all, enriched]);
        this.commentText.reset();
      });
    } else {
      this.commentText.markAsTouched();
    }
  }

  onCloseComments() {
    this.commentClose.emit();
  }
}
