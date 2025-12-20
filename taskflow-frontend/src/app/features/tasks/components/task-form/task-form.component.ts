import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../../../../core/services/tasks.service';

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
export class TaskFormComponent {
  @Input() projectId!: number;
  @Output() created = new EventEmitter<void>();

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

  submit() {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        projectId: this.projectId,
        createdAt: new Date().toISOString()
      };

      this.tasksService.create(this.projectId, newTask).subscribe(() => {
        this.created.emit();
      });
    }
  }
}
