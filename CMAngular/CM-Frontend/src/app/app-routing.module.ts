import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';
import { AuthDeactiveGuard } from './Guards/auth-deactive.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashbord', pathMatch: 'full'
  },
  {
    path: 'dashbord', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthDeactiveGuard]
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [AuthDeactiveGuard]
  },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
