import { Component, inject, signal } from '@angular/core';
import { TeamsService } from '../../core/service/teams-service';
import { TeamCard } from "../../shared/components/team-card/team-card";
import { AddTeam } from "../../shared/components/add-team/add-team";
import { ProjectService } from '../../core/service/project-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teams',
  imports: [TeamCard, AddTeam, MatButtonModule, MatIconModule],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams {
  teamsService = inject(TeamsService);
  teams = this.teamsService.teams$;
  isAddingTeam = signal(false);
  projectService = inject(ProjectService);

  ngOnInit() {
    this.teamsService.getTeams().subscribe();
  }

  onAddTeam() {
    this.isAddingTeam.set(true);
  }

  closeAddTeam() {
    this.isAddingTeam.set(false);
  }

  showTeams(teamId: number) {
    const currentId = this.teamsService.selectedTeamId();
    if (currentId === teamId) {
      this.teamsService.selectedTeamId.set(null);
    } else {
      this.teamsService.selectedTeamId.set(teamId);
    }
  }
}