import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { EmployeesService } from '../../services/employees.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isNewPassInvalid: boolean = false;
  isNotCorrectPassword: boolean = false;
  correctChange: boolean = false;
  currentPassIsEmpty: boolean = false;
  newPassIsEmpty: boolean = false;


  currentEmployeeName: string = 'Isra';

  employees: any = [];

  employeePassword: string = "";

  myForm: FormGroup;

  constructor(private EmployeesService: EmployeesService) {

    this.myForm = new FormGroup({
      password: new FormControl,
      newPassword: new FormControl,
      confirmPassword: new FormControl
    });


  }

  ngOnInit(): void {
    this.EmployeesService.getEmployees()
      .subscribe(data => {
        this.employees = data;

        let employee = this.employees.find((employee: any) => employee.name == this.currentEmployeeName)

        this.employeePassword = employee.password;

      });

  }

  change(): void {
    this.isNewPassInvalid = false;
    this.isNotCorrectPassword = false;
    this.correctChange = false;
    this.currentPassIsEmpty = false;
    this.newPassIsEmpty = false;

    this.checkPassword();

    this.checkOldAndNewPassword();

    if (!this.currentPassIsEmpty && !this.isNotCorrectPassword && !this.newPassIsEmpty && !this.isNewPassInvalid) {

      this.correctChange = true;
    }
  }



  checkPassword(): void {

    if (this.myForm.value.password) {

      if (this.employeePassword != this.myForm.value.password) {
        this.isNotCorrectPassword = true;
      }

    } else {
      this.currentPassIsEmpty = true;
    }

  }


  checkOldAndNewPassword() {

    if (this.myForm.value.newPassword) {

      if (this.myForm.value.newPassword != this.myForm.value.confirmPassword) {
        this.isNewPassInvalid = true;

      }

    } else {
      this.newPassIsEmpty = true;
    }

  }
}
