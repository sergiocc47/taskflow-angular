import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Project } from '../../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [MatCardModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() open = new EventEmitter<number>();
}
