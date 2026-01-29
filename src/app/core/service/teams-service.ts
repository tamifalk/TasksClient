import { inject, Injectable, signal } from '@angular/core';
import { TeamAddMemberRequest, TeamResponse, TeamResponseAdd } from '../../shared/models/teams-model';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/teams';

  private _teams = signal<TeamResponse[]>([]);
  teams$ = this._teams.asReadonly();
  selectedTeamId = signal<number | null>(null);

  getTeams() {
    return this.http.get<TeamResponse[]>(this.apiUrl).pipe(
      tap({
        next: (teams) => {
          this._teams.set(teams);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }

  addTeam(teamName: string) {
    return this.http.post<TeamResponseAdd>(this.apiUrl, { name: teamName }).pipe(
      tap({
        next: (newTeam) => {
          const teamWithCount: TeamResponse = { ...newTeam, members_count: 1 };
          this._teams.update((teams) => [...teams, teamWithCount]);
        },
        error: (err) => {
          //create a component to show error messages
        }
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
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }
}