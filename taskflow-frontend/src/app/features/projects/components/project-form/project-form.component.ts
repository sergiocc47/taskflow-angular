import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../core/services/projects.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  @Output() created = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.projectForm.valid) {
      const project = {
        ...this.projectForm.value,
        ownerId: 1, // Temporary static ownerId
        createdAt: new Date().toISOString()
      };

      this.projectsService.create(project).subscribe({
        next: () => {
          console.log('Project created successfully');
          this.created.emit();
          this.close.emit();
        },
        error: (err) => console.error('Error creating project', err)
      });
    }

  }

  closeForm() {
    this.close.emit();
  }
}
