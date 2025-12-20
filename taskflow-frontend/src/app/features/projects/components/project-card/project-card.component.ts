import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Project } from '../../../../core/models/project.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-card',
  imports: [
    MatCardModule,
    DatePipe
],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() open = new EventEmitter<number>();
}
