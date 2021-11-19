import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {


  constructor(private AuthService: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> | boolean {

    return this.AuthService.validateToken()
      .pipe(
        tap(valid => {

          if (!valid) {
            this.router.navigateByUrl('/auth');
          }

        })
      );
  }
  canLoad(): Observable<boolean> | boolean {

    return this.AuthService.validateToken()
      .pipe(
        tap(valid => {

          if (!valid) {
            this.router.navigateByUrl('/auth');
          }

        })
      );
  }
}
