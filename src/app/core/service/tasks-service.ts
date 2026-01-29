import { inject, Injectable, signal } from '@angular/core';
import { TaskRequest, TaskResponse, TaskUpdateRequest } from '../../shared/models/task-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  private _tasks = signal<TaskResponse[]>([]);
  tasks$ = this._tasks.asReadonly();

  getTasks() {
    return this.http.get<TaskResponse[]>(this.apiUrl).pipe(
      tap({
        next: (tasks) => {
          this._tasks.set(tasks);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

  addTask(task: TaskRequest) {
    return this.http.post<TaskResponse>(this.apiUrl, task).pipe(
      tap({
        next: (newTask) => {
          this._tasks.update((tasks) => [...tasks, newTask]);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

updateTask(id:number,task: TaskUpdateRequest) {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/${id}`, task).pipe(
      tap({
        next: (updatedTask) => {
          this._tasks.update((tasks) => tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

deleteTask(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => {
          this._tasks.update((tasks) => tasks.filter(t => t.id !== id));
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

  getTasksByProjectId(projectId: number) {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<TaskResponse[]>(this.apiUrl, {params}).pipe(
      tap({
        next: (tasks) => {
          this._tasks.set(tasks);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

}