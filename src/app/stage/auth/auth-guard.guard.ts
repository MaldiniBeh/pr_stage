import { AuthServiceService } from './../../service/auth-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authSer: AuthServiceService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      if (this.authSer.isready) {
        return resolve(this.isAuthentificate());
      }
      else {
        const time = setInterval(() => {
          if (this.authSer.isready) {
            clearInterval(time);
            return resolve(this.isAuthentificate());
          }
        }, 500);
      }
    })
  }
  isAuthentificate(): boolean {
    if (!this.authSer.isAuthticated()) {
      this.router.navigateByUrl('/');
      return false;
    }
    else { return true; }
  }
}
