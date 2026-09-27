import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5000/api/contacts';

  constructor(private http: HttpClient) {}

  createContact(data: Contact): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getContacts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
