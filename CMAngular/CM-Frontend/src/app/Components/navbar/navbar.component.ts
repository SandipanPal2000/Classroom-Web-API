import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private route: Router,
    private auth: AuthService,
    private user: UserService,
  ) { }

  public fullName: string = "";
  public role: string = ""
  public isLoggedIn$!: Observable<boolean>;

  ngOnInit() {
    this.user.getFullNameFromStore()
      .subscribe(val => {
        let fullNameFromToken = this.auth.GetFullNameFromToken();
        this.fullName = val || fullNameFromToken;
      })
    this.user.getRoleFromStore()
      .subscribe(val => {
        let roleFromToken = this.auth.GetRoleFromToken();
        this.role = val || roleFromToken;
      })
    this.user.getUserLoginStatus()
      .subscribe(() => {
        this.isLoggedIn$ = this.auth.isLoggedInObserver();
      });
  }

  gotoLoginButton() {
    this.route.navigate(['login']);
  }
  gotoRegisterButton() {
    this.route.navigate(['register']);
  }
  logOutButton() {
    this.auth.Logout();
    this.user.setUserLoginStatusFalse();
    this.route.navigate(['']);
  }
  dashbordButton() {
    this.route.navigate(['dashbord']);
  }
  adminDashbordButton() {
    if (this.role == 'Teacher')
      this.route.navigate(['admin']);
  }
}
