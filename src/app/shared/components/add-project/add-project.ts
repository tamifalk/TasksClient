import { Component, inject, output } from '@angular/core';
import { ProjectService } from '../../../core/service/project-service';
import { TeamsService } from '../../../core/service/teams-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {

  projectService = inject(ProjectService);
  teamService = inject(TeamsService);
  teams = this.teamService.teams$;

  private fb = inject(FormBuilder);
  projectForm: FormGroup;

  closeAddProject = output<void>();

  constructor() {
    this.projectForm = this.fb.group({
      teamId: [null, Validators.required],
      name: ['', Validators.required],
      description: [''],

    });
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe();
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      this.projectService.addProject(formData).subscribe({
        next: () => {
          this.closeAddProject.emit();
        },
        error: (error) => {
          //crete component to show error message
        }
      });
    }
    else {
      this.projectForm.markAllAsTouched();
    }
  }

  cancel() {
    this.closeAddProject.emit();
  }
}
