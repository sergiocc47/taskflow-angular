import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTasksByProjectId(projectId: number): Observable<any> {
    return this.http.get(`${this.url}/projects/${projectId}/tasks`);
  }

  create(projectId: number, taskData: any): Observable<any> {
    return this.http.post(`${this.url}/projects/${projectId}/tasks`, taskData);
  }

  update(taskId: number, taskData: any): Observable<any> {
    return this.http.put(`${this.url}/tasks/${taskId}`, taskData);
  }

  delete(taskId: number): Observable<any> {
    return this.http.delete(`${this.url}/tasks/${taskId}`);
  }
}
