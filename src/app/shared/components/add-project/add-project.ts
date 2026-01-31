import { Component, inject, output } from '@angular/core';
import { ProjectService } from '../../../core/service/project-service';
import { TeamsService } from '../../../core/service/teams-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatLabel, MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core'; // כאן נמצא ה-mat-option
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule, // חייב בשביל שהטופס והכפתור יעבדו
    MatFormFieldModule,  // חייב בשביל העיצוב של השדה
    MatInputModule,      // חייב בשביל ה-matInput
    MatSelectModule,     // חייב בשביל ה-mat-select
    MatButtonModule,     // חייב בשביל שכפתורי ה-Material יגיבו
    MatIconModule],
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
      });
    }
    else {
      this.projectForm.markAllAsTouched();
      Object.values(this.projectForm.controls).forEach(control => {
      control.markAsDirty();
    });
    }
  }

  cancel() {
    this.closeAddProject.emit();
  }
}
