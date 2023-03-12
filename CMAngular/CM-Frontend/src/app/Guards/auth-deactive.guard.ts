import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDeactiveGuard implements CanActivate {
  constructor(private auth: AuthService) { }
  canActivate(): boolean {
    if (!this.auth.isLoggedin()) {
      return true;
    } else {
      // this.toast.error({ detail: "ERROR!", summary: "Please Login First!", duration: 1000 });
      return false;
    }
  }

}
