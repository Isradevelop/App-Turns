import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.css']
})
export class ShiftCreateComponent implements OnInit {

  nameIsEmpty: boolean = false;
  shiftIsEmpty: boolean = false;
  shiftCreated: boolean = false;

  myForm: FormGroup;

  constructor(private employeesService: EmployeesService) {

    this.myForm = new FormGroup({
      name: new FormControl(),
      shift: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  createShift() {
    this.nameIsEmpty = false;
    this.shiftIsEmpty = false;
    this.shiftCreated = false;

    if (this.checkEmptyName() && this.checkEmptyShift()) {
      this.shiftCreated = true;
      this.employeesService.createEmployee(this.myForm.value.name, this.myForm.value.shift)
    }
  }

  checkEmptyName(): boolean {
    if (this.myForm.value.name) {
      return true;
    } else {
      this.nameIsEmpty = true;
      return false;
    }
  }

  checkEmptyShift(): boolean {
    if (this.myForm.value.shift) {
      return true;
    } else {
      this.shiftIsEmpty = true;
      return false;
    }
  }

}
