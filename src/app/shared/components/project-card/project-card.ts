import { Component, computed, inject, input, output } from '@angular/core';
import { ProjectResponse } from '../../models/project-model';
import { TeamsService } from '../../../core/service/teams-service';
import { MatIcon } from "@angular/material/icon";
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [MatIcon,DatePipe, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<ProjectResponse>();
  teamService = inject(TeamsService);
  projectId=output<number>();

  teamName =computed(() => {
    const team = this.teamService.teams$().find(t => t.id === this.project().team_id);
  return team ? team.name : 'Unknown Team';
  }
  );

  projectClicked() {
    this.projectId.emit(this.project().id);
  }
}
