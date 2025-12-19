import { Component, Input } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    TaskItemComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks!: Task[];
}
