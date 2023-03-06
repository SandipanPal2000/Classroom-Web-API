import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isLoggedin: boolean= this.auth.isLoggedin();
  public fullname: string= "";
  public role: string= "";
  constructor(private auth: AuthService, private user: UserService, private route: Router, private fb: FormBuilder){}
  ngOnInit(){
    // this.user.getFullNameFromStore()
    // .subscribe(val=> {
    //   let FullNameFromToken= this.auth.GetFullNameFromToken();
    //   this.fullname= val||FullNameFromToken;
    // })
    // this.user.getRoleFromStore()
    // .subscribe(val=> {
    //   let RoleFromToken= this.auth.GetRoleFromToken();
    //   this.role= val||RoleFromToken;
    // })
    
  }
  GotoRegisterButton(){
    this.route.navigate(['/register']);
  }
  GotoLoginButton(){
    this.route.navigate(['/login']);
  }
  GotoLogoutButton(){
    this.auth.Logout();
    this.isLoggedin= false;
    this.route.navigate(['']);
  }
  GotoAdminDashboardButton(){
    if(this.role='Teacher')
    this.route.navigate(['/admin']);
  }

}
