import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Initialize the subject based on the token status
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    // Demo login: always succeeds
    return of({ token: 'demo-token-' + Date.now() }).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('authToken');
    }
    this.isLoggedInSubject.next(false);
  }

  // THIS IS THE METHOD THE GUARD IS LOOKING FOR
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('authToken');
    }
    return null;
  }
}