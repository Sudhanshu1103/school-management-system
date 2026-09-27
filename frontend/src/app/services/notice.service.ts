import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notice } from '../models/notice.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private apiUrl = 'http://localhost:5000/api/notices';

  constructor(private http: HttpClient) {}

  getNotices(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getNoticeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createNotice(notice: Notice): Observable<any> {
    return this.http.post<any>(this.apiUrl, notice);
  }

  updateNotice(id: string, notice: Partial<Notice>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, notice);
  }

  deleteNotice(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
