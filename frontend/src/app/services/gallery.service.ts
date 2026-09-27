import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery } from '../models/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'http://localhost:5000/api/galleries';

  constructor(private http: HttpClient) {}

  getGalleries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getGalleryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createGallery(gallery: Gallery): Observable<any> {
    return this.http.post<any>(this.apiUrl, gallery);
  }

  updateGallery(id: string, gallery: Partial<Gallery>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, gallery);
  }

  deleteGallery(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
