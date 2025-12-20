import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../../../core/models/task.model';

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
  @Output() deleted = new EventEmitter<number>();
  @Output() taskToEdit = new EventEmitter<Task>();

  edit(task: Task) {
    this.taskToEdit.emit(task);
  }

  delete(taskId: number) {
    this.deleted.emit(taskId);
  }
}
