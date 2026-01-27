import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;
  private apiUrl = 'http://localhost:8080/api/auth'; // backend URL

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.post(`${this.apiUrl}/login`, null, { params, responseType: 'text' }).pipe(
      tap(response => {
        // Only set token and mark as logged in if the response is successful
        if (response && this.isBrowser) {
          localStorage.setItem('authToken', 'dummy-token');
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        if (this.isBrowser) localStorage.removeItem('authToken');
        this.isLoggedInSubject.next(false);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${this.apiUrl}/forgot-password`, null, { params, responseType: 'text' });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const params = new HttpParams().set('token', token).set('newPassword', newPassword);
    return this.http.post(`${this.apiUrl}/reset-password`, null, { params, responseType: 'text' });
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return this.isBrowser ? !!localStorage.getItem('authToken') : false;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('authToken') : null;
  }
}