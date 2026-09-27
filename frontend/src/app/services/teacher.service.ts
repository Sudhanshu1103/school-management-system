import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:5000/api/teachers';

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getTeacherById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTeacher(teacher: Teacher): Observable<any> {
    return this.http.post<any>(this.apiUrl, teacher);
  }

  updateTeacher(id: string, teacher: Partial<Teacher>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, teacher);
  }

  deleteTeacher(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
