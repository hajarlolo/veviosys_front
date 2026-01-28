import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, of, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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


  private hasToken(): boolean {
    return this.isBrowser ? !!localStorage.getItem('authToken') : false;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('authToken') : null;
  }

  // User State Management
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private getUserFromStorage(): any {
    if (this.isBrowser) {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  // Update login to set mock user
  login(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('password', password);
    // Expecting User object from backend login response now
    return this.http.post<any>(`${this.apiUrl}/login`, null, { params }).pipe(
      tap((user: any) => {
        if (user && user.id && this.isBrowser) {
          // Assuming backend now returns User object with ID
          localStorage.setItem('authToken', 'your-actual-jwt-token-if-any'); // Replace with actual token from backend if applicable
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
        } else {
           console.error('Login failed: User object or ID missing from backend response. Ensure backend /api/auth/login returns User object.');
           // Handle login failure or incomplete data scenario
        }
      })
    );
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, userData).pipe(
      tap(updatedUser => {
        if (this.isBrowser) {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
        this.currentUserSubject.next(updatedUser);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        if (this.isBrowser) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
        }
        this.currentUserSubject.next(null);
        this.isLoggedInSubject.next(false);
      })
    );
  }


  getAllUsers(): Observable<any[]> {
    // Mock list of users for Parametres -> Utilisateurs tab
    return of([
      { id: 1, nom: 'Doe', prenom: 'John', email: 'john@example.com', role: 'Admin' },
      { id: 2, nom: 'Smith', prenom: 'Jane', email: 'jane@example.com', role: 'User' }
    ]);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/find/${id}`);
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

  getPhotoUrl(path: any, name: string = 'User'): string {
    if (!path) {
      // Clean name: remove 'undefined' and trim
      const cleanName = (name || '').replace(/undefined/g, '').trim() || 'User';
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=1E5AA8&color=fff&size=256`;
    }

    if (path.startsWith('http') || path.startsWith('assets') || path.startsWith('data:')) {
      return path;
    }

    return `http://localhost:8080${path}`;
  }
}
