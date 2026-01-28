import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      take(1), // prend la valeur actuelle et termine
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
        return isLoggedIn;
      })
    );
  }
}
