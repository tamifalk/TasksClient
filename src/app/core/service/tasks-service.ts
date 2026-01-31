import { computed, inject, Injectable, signal } from '@angular/core';
import { TaskRequest, TaskResponse, TaskUpdateRequest } from '../../shared/models/task-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';
import { ProjectService } from './project-service';
import { NotificationService } from './notification-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private notify = inject(NotificationService);
  private apiUrl = `${environment.apiUrl}/tasks`;

  private _tasks = signal<TaskResponse[]>([]);
  tasks$ = this._tasks.asReadonly();

  clearTasks() {
    this._tasks.set([]);
  }

  getTasks() {
    return this.http.get<TaskResponse[]>(this.apiUrl).pipe(
      tap({
        next: (tasks) => {
          this._tasks.set(tasks);
        },
      })
    );
  }

  addTask(task: TaskRequest) {
    return this.http.post<TaskResponse>(this.apiUrl, task).pipe(
      tap({
        next: (newTask) => {
          this._tasks.update((tasks) => [...tasks, newTask]);
          this.notify.showSuccess('Task added successfully');
        },
      })
    );
  }

  updateTask(id: number, task: TaskUpdateRequest) {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/${id}`, task).pipe(
      tap({
        next: (updatedTask) => {
          this._tasks.update((tasks) => tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        },
      })
    );
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => {
          this._tasks.update((tasks) => tasks.filter(t => t.id !== id));
          this.notify.showSuccess('Task deleted successfully');
        },
      })
    );
  }

  getTasksByProjectId(projectId: number) {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<TaskResponse[]>(this.apiUrl, { params }).pipe(
      tap({
        next: (tasks) => {
          this._tasks.set(tasks);
        },
      })
    );
  }

}