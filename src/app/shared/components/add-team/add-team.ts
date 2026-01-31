import { Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeamsService } from '../../../core/service/teams-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-team',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatIconModule],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
})
export class AddTeam {
  teamService = inject(TeamsService);
  teamName = new FormControl('', [Validators.required]);

  teamSaved = output<void>();
  cancel = output<void>();

  onSubmit() {
    if (this.teamName.valid) {
      this.teamService.addTeam(this.teamName.value!).subscribe({
        next: () => {
          this.teamSaved.emit();
        }
      });
    }
    else {
      this.teamName.markAsTouched();
      this.teamName.markAsDirty();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}
