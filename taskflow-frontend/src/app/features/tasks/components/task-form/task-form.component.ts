import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../../../../core/services/tasks.service';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnChanges {
  @Input() projectId!: number;
  @Input() taskToEdit: Task | null = null;
  @Output() updated = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  taskForm: FormGroup;
  statuses = [
    { value: 'pending', viewValue: 'Pending' },
    { value: 'in_progress', viewValue: 'In Progress' },
    { value: 'completed', viewValue: 'Completed' }
  ]
  priorities = [
    { value: 'low', viewValue: 'Low' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'high', viewValue: 'High' }
  ]

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [this.statuses[0].value, Validators.required],
      priority: [this.priorities[0].value, Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.taskToEdit) {
      this.taskForm.patchValue(this.taskToEdit);
    } else {
      this.taskForm.reset({
        status: this.statuses[0].value,
        priority: this.priorities[0].value
      });
    }
  }

  submit() {
    if (this.taskForm.valid) {
      const task = {
        ...this.taskForm.value,
        projectId: this.projectId,
        createdAt: new Date().toISOString()
      };

      if (!this.taskToEdit) {
        this.tasksService.create(this.projectId, task).subscribe(() => {
          this.created.emit();
          this.close.emit();
        });
      } else {
        this.tasksService.update(this.taskToEdit.id, task).subscribe(() => {
          this.updated.emit();
          this.close.emit();
        });
      }
    }
  }

  closeForm() {
    this.close.emit();
  }
}
