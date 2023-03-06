import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private fullname$= new BehaviorSubject<string>('');
  private role$= new BehaviorSubject<string>('');
  constructor() { }
  public getRoleFromStore(){
    return this.role$.asObservable();
  }
  public setRoleForStore(role: string){
    this.role$.next(role);
  }
  public getFullNameFromStore(){
    return this.fullname$.asObservable();
  }
  public setFullNameForStore(role: string){
    this.fullname$.next(role);
  }
}
