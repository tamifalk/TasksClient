import { inject, Injectable, signal } from '@angular/core';
import { TeamAddMemberRequest, TeamResponse, TeamResponseAdd } from '../../shared/models/teams-model';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private http = inject(HttpClient);
  private notify = inject(NotificationService);
  private apiUrl = `${environment.apiUrl}/teams`;
  private _teams = signal<TeamResponse[]>([]);
  teams$ = this._teams.asReadonly();
  selectedTeamId = signal<number | null>(null);

  getTeams() {
    return this.http.get<TeamResponse[]>(this.apiUrl).pipe(
      tap({
        next: (teams) => {
          this._teams.set(teams);
        },
      })
    );
  }

  addTeam(teamName: string) {
    return this.http.post<TeamResponseAdd>(this.apiUrl, { name: teamName }).pipe(
      tap({
        next: (newTeam) => {
          const teamWithCount: TeamResponse = { ...newTeam, members_count: 1 };
          this._teams.update((teams) => [...teams, teamWithCount]);
          this.notify.showSuccess('Team created successfully');
        },
      })
    );
  }

  addMemberToTeam(teamId: number, member: TeamAddMemberRequest) {
    const body = {
      role: 'member',
      ...member
    };
    return this.http.post(`${this.apiUrl}/${teamId}/members`, body).pipe(
      tap({
        next: () => {
          this._teams.update((teams) => teams.map(team => {
            if (team.id === teamId) {
              return { ...team, members_count: team.members_count + 1 };
            }
            return team;
          }));
          this.notify.showSuccess('Member added to team successfully');
        },
        error: (err) => {
          if (err.status === 403) {
            this.notify.showError('you are not a member of this team');
          }
        }
      })
    );
  }

  getTeamMembers(teamId: number) {
    return this.http.get<TeamAddMemberRequest[]>(`${this.apiUrl}/${teamId}/members`);
  }
}