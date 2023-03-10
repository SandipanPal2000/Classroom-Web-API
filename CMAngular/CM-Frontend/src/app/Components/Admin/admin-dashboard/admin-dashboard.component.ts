import { Component } from '@angular/core';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(public crud: CrudService) { }

  toggleStudentList: boolean = true;
  toggleAttendenceList: boolean = false;

  ngOnInit(): void {
    this.crud.showStudntList()
      .subscribe({
        next: (data: any) => {
          this.crud.list = data.result.data;
          console.log(data.result.data);
        }
      })
  }
  toggleStudentListButton() {
    this.toggleStudentList = !this.toggleStudentList;
  }
  toggleAttendenceListButton() {
    this.toggleAttendenceList = !this.toggleAttendenceList;
  }
  showPopupButton() {
    this.crud.showPopup = true;
  }
  callEditStudent(id: number) {
    this.crud.idForEdit = id;
    this.showPopupButton();
  }
  callDeleteStudent(id: number) {
    this.crud.deleteStudent(id).subscribe();
  }
}
