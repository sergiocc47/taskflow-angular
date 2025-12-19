import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../core/models/project.model';
import { ProjectsService } from '../../../../core/services/projects.service';
import { Router } from '@angular/router';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  imports: [
    CommonModule,
    ProjectCardComponent,
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export default class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
      console.log('Projects loaded:', this.projects);
    });
  }

  goToDetail(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }

}
