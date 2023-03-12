import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private route: Router,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const JwtToken = this.auth.GetToken();

    if (JwtToken) {
      request = request.clone({
        setHeaders: { Authorization: `bearer ${JwtToken}` }

      })
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        console.log(err)
        if (err instanceof HttpErrorResponse) {
          if (err.status == 400) {
            let summary_ = err.error.message
            // this.toast.warning({ detail: 'Warning!', summary: summary_, duration: 2000 })
          }
          if (err.status == 401) {
            // this.toast.warning({ detail: "Warning!", summary: "Please login again!" });
            this.route.navigate(['login'])
          }
        }
        return throwError(() => new Error("Some other Error Occured"))
      })
    );
  }
}
