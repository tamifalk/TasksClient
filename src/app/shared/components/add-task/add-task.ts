import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../../core/service/tasks-service';
import { ProjectService } from '../../../core/service/project-service';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
  host: {
    '[class.list-mode]': 'viewMode() === "list"',
    '[class.board-mode]': 'viewMode() === "board"'
  }
})
export class AddTask {

  private taskService = inject(TasksService);
  projectService = inject(ProjectService);
  projects = this.projectService.projects$;

  private fb = inject(FormBuilder);
  taskForm: FormGroup;
  taskSaved = output<void>();
  viewMode = input<'list' | 'board'>();

  constructor() {
    this.taskForm = this.fb.group({
      projectId: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
    });
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe();
    const preselectedId = this.projectService.selectedProjectId();
    if (preselectedId) {
      this.taskForm.patchValue({ project_id: preselectedId });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      this.taskService.addTask(formData).subscribe({
        next: () => {
          this.taskSaved.emit();
        }
      });
    }
    else {
      this.taskForm.markAllAsTouched();
    }
  }

  cancel() {
    this.taskSaved.emit();
  }
}