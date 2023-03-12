import { Injectable } from '@angular/core';
import StudentModel from '../Models/Student';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private route: Router) { }

  readonly rootUrl = environment.rootUrl;

  idForEdit: number = NaN;
  dataForEdit!: any;
  list: StudentModel[] = [];
  showPopup: boolean = false;

  addStudent(body: any) {
    return this.http.post(this.rootUrl + "/Student/AddStudent", body);
  }
  editStudent(body: any) {
    return this.http.put(this.rootUrl + "/Student/EditStudent", body);
  }
  showOneStudent(id: number) {
    return this.http.get(this.rootUrl + "/Student/GetSingleStudent?id=" + id);
  }
  showStudntList(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(this.rootUrl + "/Student/GetAllStudent");
  }
  deleteStudent(id: number) {
    return this.http.delete(this.rootUrl + "/Student/DeleteStudent?Id=" + id);
  }
}
