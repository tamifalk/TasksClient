import { Component, computed, inject, input, Input, output, signal } from '@angular/core';
import { TaskResponse, TaskUpdateRequest } from '../../models/task-model';
import { CommonModule, DatePipe } from '@angular/common';
import { Comments } from "../../../features/comments/comments";
import { MatIcon } from "@angular/material/icon";
import { ProjectService } from '../../../core/service/project-service';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, Comments, MatIcon, CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
  host: {
    '[class.list-mode]': 'viewMode() === "list"',
    '[class.board-mode]': 'viewMode() === "board"'
  }
})
export class TaskCard {
  task = input.required<TaskResponse>();
  viewMode = input<'list' | 'board'>('board');
  delelteTask = output<number>();
  updateTask = output<{ id: number, fields: TaskUpdateRequest }>();
  isComments = signal(false);


  statuses = ['todo', 'in_progress', 'done'];
  priorities = ['low', 'normal', 'high'];

  //מציאת שם הפרויקט לפי מזהה הפרויקט
  private projectService = inject(ProjectService);
  projectName = computed(() => {
  const projectId = this.task().project_id;
  const projects = this.projectService.projects$(); 
  const project = projects.find(p => p.id === projectId);
  return project ? project.name : 'Loading...';
});

  onDelete() {
    this.delelteTask.emit(this.task().id);
  }

  updateField(id: number, fields: TaskUpdateRequest) {
    this.updateTask.emit({ id, fields });
  }

  showComments() {
    this.isComments.set(!this.isComments());
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'todo': return 'var(--clickup-red)';
      case 'in_progress': return 'var(--clickup-blue)';
      case 'done': return 'var(--clickup-green)';
      default: return '#f1f5f9';
    }
  }
}

