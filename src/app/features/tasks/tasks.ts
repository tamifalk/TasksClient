import { Component, computed, inject, signal } from '@angular/core';
import { TasksService } from '../../core/service/tasks-service';
import { TaskCard } from '../../shared/components/task-card/task-card';
import { AddTask } from '../../shared/components/add-task/add-task';
import { TaskUpdateRequest } from '../../shared/models/task-model';
import { ActivatedRoute } from '@angular/router';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../core/service/project-service';

@Component({
  selector: 'app-tasks',
  imports: [TaskCard, AddTask,MatIcon, MatButtonModule, MatIconModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {

  isAddingTask = signal(false);
  taskService = inject(TasksService);
  tasks = this.taskService.tasks$;
  projectService = inject(ProjectService);
  route = inject(ActivatedRoute);
  

  viewMode = signal<'list' | 'board'>('list');
  statuses = ['todo', 'in_progress', 'done'];
  boardTasks = computed(() => {
    const allTasks = this.tasks();
    return this.statuses.map(status => ({
      title: status,
      tasks: allTasks.filter(task => task.status === status)
    }));
  });


  ngOnInit() {
    const projectIdFromUrl = this.route.snapshot.paramMap.get('projectId');

    if (projectIdFromUrl) {
      const id = Number(projectIdFromUrl);
      this.projectService.selectedProjectId.set(id);
      this.taskService.getTasksByProjectId(id).subscribe();
    } else {
      this.projectService.selectedProjectId.set(null);
      this.taskService.getTasks().subscribe();
    }
  }

  ngOnDestroy() {
    this.projectService.selectedProjectId.set(null);
    this.taskService.clearTasks();
  }

  setViewMode(mode: 'list' | 'board') {
    this.viewMode.set(mode);
  }

  addTask() {
    this.isAddingTask.set(true);
  }

  closeAddTask() {
    this.isAddingTask.set(false);
  }

  onDeleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe();
  }

  onTaskUpdated(event: { id: number, fields: TaskUpdateRequest }) {
    this.taskService.updateTask(event.id, event.fields).subscribe();
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'todo': return 'var(--clickup-red)';
      case 'in_progress': return 'var(--clickup-blue)';
      case 'done': return 'var(--clickup-green)';
      default: return '#f1f5f9';
    }
  }

  getStatusIcon(status: string): string {
    const s = status?.toLowerCase();
    if (s.includes('todo')) return 'list_alt';
    if (s.includes('progress')) return 'pending';
    if (s.includes('done')) return 'check_circle';
    return 'task';
  }
}
