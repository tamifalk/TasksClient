import { Component, computed, inject, signal } from '@angular/core';
import { TasksService } from '../../core/service/tasks-service';
import { TaskCard } from '../../shared/components/task-card/task-card';
import { AddTask } from '../../shared/components/add-task/add-task';
import { TaskUpdateRequest } from '../../shared/models/task-model';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [TaskCard, AddTask, RouterOutlet,RouterLinkActive,RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {

  isAddingTask = signal(false);
  taskService = inject(TasksService);
  tasks = this.taskService.tasks$;

  viewMode = signal<'list' | 'board'>('list');
  statuses = ['todo', 'in_progress', 'done'];
  boardTasks = computed(() => {
    const allTasks = this.tasks();
    return this.statuses.map(status => ({
      title:status,
      tasks: allTasks.filter(task => task.status === status)
    }));
  });

  setViewMode(mode: 'list' | 'board') {
    this.viewMode.set(mode);
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe();
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
}
