import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../core/service/project-service';
import { ProjectCard } from "../../shared/components/project-card/project-card";
import { AddProject } from "../../shared/components/add-project/add-project";
import { TasksService } from '../../core/service/tasks-service';
import { Tasks } from "../tasks/tasks";


@Component({
  selector: 'app-projects',
  imports: [ProjectCard, AddProject, Tasks],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projectService = inject(ProjectService);
  projects = this.projectService.projects$;
  taskService = inject(TasksService);
  isAddingProject = signal(false);

  ngOnInit() {
    this.projectService.getProjects().subscribe();
  }

  addProject() {
    this.isAddingProject.set(true);
    
  } 

  closeAddProject() {
    this.isAddingProject.set(false);
  }

  showTasks(projectId: number) {
    this.projectService.selectedProjectId.set(projectId);
    this.taskService.getTasksByProjectId(projectId).subscribe();
  }

  ngOnDestroy() {
    this.projectService.selectedProjectId.set(null);
  }
}
