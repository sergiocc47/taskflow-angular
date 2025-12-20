import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../core/models/project.model';
import { Task } from '../../../../core/models/task.model';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../../../core/services/projects.service';
import { TasksService } from '../../../../core/services/tasks.service';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../../../tasks/components/task-list/task-list.component';
import { TaskFormComponent } from "../../../tasks/components/task-form/task-form.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-detail',
  imports: [
    CommonModule,
    TaskListComponent,
    TaskFormComponent,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export default class ProjectDetailComponent implements OnInit {
  project!: Project;
  tasks: Task[] = [];
  projectId!: number;
  showForm: boolean = false;
  selectedTask: Task | null = null;

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

  deleteTask(id: number) {
    this.tasksService.delete(id).subscribe({
      next: () => {
        console.log(`Task ${id} deleted successfully`);
        this.loadTasks();
      },
      error: (err) => console.error(`Error deleting task ${id}`, err)
    });
  }

  openCreateForm() {
    this.selectedTask = null;
    this.showForm = true;
  }

  openEditForm(task: Task) {
    console.log('task to edit', task);
    this.selectedTask = task;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }
}
