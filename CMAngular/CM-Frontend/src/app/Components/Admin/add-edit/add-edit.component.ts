import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clippingParents } from '@popperjs/core';
import ValidateForm from 'src/Helpers/ValidateForm';
import { CrudService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
  constructor(
    public crud: CrudService,
    public fb: FormBuilder,
  ) { }

  addEditForm!: FormGroup;
  inputButton: string = 'ADD';

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      studentId: 0,
      studentName: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z][A-Za-z ]*[A-Za-z]$")])],
      studentRoll: "",
      department: "",
      score: 0,
    })
    if (this.crud.idForEdit) {
      this.populateEditForm();
      this.inputButton = 'UPDATE'
    }
  }
  onSubmit() {
    if (this.addEditForm.valid) {
      if (!this.crud.idForEdit) {
        this.crud.addStudent(this.addEditForm.value)
          .subscribe(
            (data: any) => {
              this.addEditForm.reset();
              this.crud.showPopup = false;
            }
          )
      } else {
        this.crud.editStudent(this.addEditForm.value)
          .subscribe(
            () => {
              this.addEditForm.reset();
              this.crud.showPopup = false;
              this.inputButton = 'ADD';
            }
          )
      }
    } else {
      ValidateForm.validateAllFormFields(this.addEditForm);
    }
  }
  populateEditForm() {
    this.crud.showOneStudent(this.crud.idForEdit)
      .subscribe(
        (data: any) => {
          this.crud.dataForEdit = data.result.data;
          console.log(data.result.data)
          this.addEditForm.controls['studentId'].setValue(data.result.data.studentId);
          this.addEditForm.controls['studentName'].setValue(data.result.data.studentName);
          this.addEditForm.controls['studentRoll'].setValue(data.result.data.studentRoll);
          this.addEditForm.controls['department'].setValue(data.result.data.department);
          this.addEditForm.controls['score'].setValue(data.result.data.score);
        }
      )
  }
  closePopup() {
    this.crud.showPopup = false;
    this.crud.idForEdit = NaN;
  }
}

