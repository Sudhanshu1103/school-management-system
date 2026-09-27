import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolEvent } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5000/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: SchoolEvent): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  updateEvent(id: string, event: Partial<SchoolEvent>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
