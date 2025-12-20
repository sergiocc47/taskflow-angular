import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../../../core/models/task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: any;
  @Output() taskId = new EventEmitter<number>();
  @Output() selectedTask = new EventEmitter<Task>();

  edit() {
    this.selectedTask.emit(this.task);
  }

  delete() {
    this.taskId.emit(this.task.id);
  }
}
