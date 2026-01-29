import { Component, inject, input, output } from '@angular/core';
import { TeamsService } from '../../../core/service/teams-service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatLabel, MatFormField } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/service/auth-service';

@Component({
  selector: 'app-add-member-team',
  imports: [MatError, MatLabel, MatFormField, ReactiveFormsModule, MatInputModule],
  templateUrl: './add-member-team.html',
  styleUrl: './add-member-team.css',
})
export class AddMemberTeam {
  teamService = inject(TeamsService);
  authService = inject(AuthService);
  userId = new FormControl('', [Validators.required]);
  teamId = input<number>();

  teamSaved = output<void>();
  cancel = output<void>();


  onSubmit() {
    if (this.userId.valid) {
      const member = { userId: Number(this.userId.value!) };
      const currentUserId = Number(this.authService.user$()?.id);
      if (member.userId != undefined && member.userId == currentUserId) {
        this.userId.setErrors({ 'cannotAddYourself': true });
        return;
      }
      this.teamService.addMemberToTeam(this.teamId()!, member).subscribe({
        next: () => {
          this.teamSaved.emit();
        }
      });
    }
    else {
      this.userId.markAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

}
