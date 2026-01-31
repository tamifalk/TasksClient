import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ProjectRequest, ProjectResponse } from '../../shared/models/project-model';
import { tap } from 'rxjs';
import { TeamsService } from './teams-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/projects';

  private teamsService = inject(TeamsService);
  private _projects = signal<ProjectResponse[]>([]);
  projects$ = this._projects.asReadonly();

  selectedProjectId = signal<number | null>(null);

  getProjects() {
    return this.http.get<ProjectResponse[]>(this.apiUrl).pipe(
      tap({
        next: (projects: ProjectResponse[]) => {
          this._projects.set(projects);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );

  }

  getProjectsByTeam = computed(() => {
    const teamId = this.teamsService.selectedTeamId(); 
    const allProjects = this._projects();
    console.log('Filtering projects for team ID:', teamId,allProjects);

    if (!teamId) {
      return allProjects; 
    }
    return allProjects.filter(p => p.team_id === teamId);
  });

  addProject(project: ProjectRequest) {
    return this.http.post<ProjectResponse>(this.apiUrl, project).pipe(
      tap({
        next: (newProject) => {
          this._projects.update((projects) => [...projects, newProject]);
        },
        error: (err) => {
          //create a component to show error messages
        }
      })
    );
  }
}
