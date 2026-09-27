import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'school_admin_token';
  private userKey = 'school_admin_user';

  currentUser = signal<any>(this.getUserFromStorage());

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res && res.data && res.data.token) {
          localStorage.setItem(this.tokenKey, res.data.token);
          localStorage.setItem(this.userKey, JSON.stringify(res.data));
          this.currentUser.set(res.data);
        }
      })
    );
  }

  register(user: { name: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getUserFromStorage(): any {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }
}
