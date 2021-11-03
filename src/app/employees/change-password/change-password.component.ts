import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { EmployeesService } from '../../services/employees.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  isSame: boolean = true;

  employeeName: string = 'Dani';


  constructor(private EmployeesService: EmployeesService) { }

  ngOnInit(): void {
  }


  myForm: FormGroup = new FormGroup({
    password: new FormControl(this.EmployeesService.password(this.employeeName)),
    newPassword: new FormControl,
    confirmPassword: new FormControl
  });


  change(): void {
    let formValue = this.myForm.value;

    let newPassword = formValue.newPassword;
    let confirmPassword = formValue.confirmPassword;

    this.check(newPassword, confirmPassword);
  }


  check(newPassword: string, confirmPassword: string) {

    newPassword === confirmPassword ? this.isSame = true : this.isSame = false;

  }

}
