import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/Helpers/ValidateForm';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  type: string = 'password';
  registerForm!: FormGroup;
  hide = true;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      name: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z][A-Za-z ]*[A-Za-z]$")])],
      password: ['', Validators.required]
    })
  }

  gotoLoginButton() {
    this.route.navigate(['/login']);
  }

  OnSubmit() {
    if (this.registerForm.valid) {
      this.auth.RegisterRequest(this.registerForm.value).subscribe(
        () => {
          //toasrt
          this.route.navigate(['/login']);
        }
      )
    } else {
      ValidateForm.validateAllFormFields(this.registerForm);
      //toast
    }
  }
}


