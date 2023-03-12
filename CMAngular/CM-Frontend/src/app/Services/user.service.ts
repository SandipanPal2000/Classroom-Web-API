import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private fullname$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() { }
  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  public setRoleForStore(role: string) {
    this.role$.next(role);
  }
  public getFullNameFromStore() {
    return this.fullname$.asObservable();
  }
  public setFullNameForStore(role: string) {
    this.fullname$.next(role);
  }
  public setUserLoginStatus() {
    this.loggedIn$.next(true);
  }
  public setUserLoginStatusFalse() {
    this.loggedIn$.next(false);
  }
  public getUserLoginStatus(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
