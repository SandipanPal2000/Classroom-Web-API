import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { clippingParents } from '@popperjs/core';
import ValidateForm from 'src/Helpers/ValidateForm';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isLoggedin: boolean = this.auth.isLoggedin();
  public fullname: string = "";
  public role: string = "";
  loginForm!: FormGroup;
  hide: boolean = true;
  constructor(private auth: AuthService, private user: UserService, private route: Router, private fb: FormBuilder) { }
  ngOnInit() {

    this.loginForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      Password: ['', Validators.required]
    })

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
  OnSubmit() {
    if (this.loginForm.valid) {
      this.auth.LoginRequest(this.loginForm.value)
        .subscribe({
          next: (data: any) => {
            this.auth.StoreToken(data.data);
            this.user.setUserLoginStatus();
            const tokenPayload = this.auth.DecodedToken();
            this.user.setFullNameForStore(tokenPayload.name);
            this.user.setRoleForStore(tokenPayload.role);
            this.route.navigate(['dashbord']);
          }
        })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
  GotoRegisterButton() {
    this.route.navigate(['register']);
  }
  GotoLoginButton() {
    this.route.navigate(['login']);
  }
  GotoLogoutButton() {
    this.auth.Logout();
    this.isLoggedin = false;
    this.route.navigate(['']);
  }
  GotoAdminDashboardButton() {
    if (this.role = 'Teacher')
      this.route.navigate(['admin']);
  }
}
