import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../../../../core/models/project.model';
import { ProjectsService } from '../../../../core/services/projects.service';
import { ProjectFormComponent } from './../../components/project-form/project-form.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-project-list',
  imports: [
    CommonModule,
    ProjectCardComponent,
    MatButtonModule,
    MatIconModule,
    ProjectFormComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export default class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  showForm: boolean = false;
  showSpinner: boolean = true;

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      this.showSpinner = false;
    });
  }

  goToDetail(projectId: number): void {
    this.router.navigate(['/projects', projectId]);
  }

  openCreateForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }
}
