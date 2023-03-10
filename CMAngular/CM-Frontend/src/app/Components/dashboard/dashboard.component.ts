import { Component } from '@angular/core';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public crud: CrudService) { }

  ngOnInit(): void {
    this.crud.showStudntList()
      .subscribe({
        next: (data: any) => {
          this.crud.list = data.result.data;
          console.log(data.result.data);
        }
      })
  }

}
