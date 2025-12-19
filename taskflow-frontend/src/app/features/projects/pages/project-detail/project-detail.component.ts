import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../core/models/project.model';
import { Task } from '../../../../core/models/task.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../../core/services/projects.service';
import { TasksService } from '../../../../core/services/tasks.service';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../../../tasks/components/task-list/task-list.component';

@Component({
  selector: 'app-project-detail',
  imports: [
    CommonModule,
    TaskListComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export default class ProjectDetailComponent implements OnInit {
  project!: Project;
  tasks: Task[] = [];
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.projectsService.getProjectById(this.projectId).subscribe((project: Project) => {
      this.project = project;
    });

    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTasksByProjectId(this.projectId).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
}
