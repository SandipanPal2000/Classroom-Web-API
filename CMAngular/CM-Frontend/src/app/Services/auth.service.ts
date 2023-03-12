import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private route: Router
  ) {
    this.userPayload = this.DecodedToken();
  }
  token?: string;
  private userPayload: any;
  readonly rootUrl = environment.rootUrl;

  RegisterRequest(body: any) {
    return this.http.post(this.rootUrl + '/Auth/Register', body);
  }
  LoginRequest(body: any) {
    return this.http.post(this.rootUrl + '/Auth/Login', body);
  }
  StoreToken(jwtToken: string) {
    this.cookie.set('jwtToken', jwtToken);
  }
  GetToken() {
    return this.cookie.get('jwtToken');
  }
  DecodedToken() {
    const jwthelper = new JwtHelperService();
    const token = this.GetToken()!;
    return jwthelper.decodeToken(token);
  }
  GetFullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }
  GetRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }
  isLoggedin(): boolean {
    return !!this.cookie.get('jwtToken');
  }
  isLoggedInObserver() {
    return of(this.isLoggedin());
  }
  Logout() {
    this.cookie.deleteAll();
    localStorage.clear();
    this.route.navigate(['']);
  }
}
