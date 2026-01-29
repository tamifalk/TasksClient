import { Component, computed, inject, input, output } from '@angular/core';
import { ProjectResponse } from '../../models/project-model';
import { TeamsService } from '../../../core/service/teams-service';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<ProjectResponse>();
  teamService = inject(TeamsService);
  projectId=output<number>();

  teamName =computed(() => {
    const team = this.teamService.teams$().find(t => t.id === this.project().id);
    return team ? team.name : 'Unknown Team';
  }
  );

  projectClicked() {
    this.projectId.emit(this.project().id);
  }
}
