import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(`${this.url}/projects`);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.url}/projects/${id}`);
  }

  create(project: Project): Observable<any> {
    return this.http.post(`${this.url}/projects`, project);
  }
}
