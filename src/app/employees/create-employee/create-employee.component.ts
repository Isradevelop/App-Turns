import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {

  isNotSamePassword: boolean = false;
  isNotValidName: boolean = false;
  showMessage: boolean = false;
  isNotEmptyName: boolean = false;
  isNotEmptyPassword: boolean = false;

  timerSubscription!: Subscription;

  employees: any = [];

  myForm: FormGroup;

  constructor(private EmployeesService: EmployeesService) {
    this.myForm = new FormGroup({
      name: new FormControl,
      password: new FormControl,
      confirmPassword: new FormControl
    });
  }

  ngOnInit(): void {
    this.timerSubscription = this.EmployeesService.getEmployees()
      .subscribe(data => this.employees = data)

  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  createEmployee(): void {

    this.isNotSamePassword = false;
    this.isNotValidName = false;
    this.isNotEmptyName = false;
    this.isNotEmptyPassword = false;

    if (this.checkName() && this.checkPassword()) {

      this.EmployeesService.createEmployee(this.myForm.value.name, this.myForm.value.password);

      this.showMessage = true;
    }

  }





  checkName(): boolean {

    if (this.myForm.value.name.trim()) {

      if (this.employees.find((employee: any) => employee.name == this.myForm.get('name')?.value) == undefined) {
        return true;
      } else {
        this.isNotValidName = true;
        return false;
      }
    } else {

      this.isNotEmptyName = true;
      return false;
    }
  }


  checkPassword(): boolean {
    if (this.myForm.value.password.trim()) {

      if (this.myForm.value.password === this.myForm.value.confirmPassword) {
        return true;
      } else {
        this.isNotSamePassword = true;
        return false;
      }

    } else {
      this.isNotEmptyPassword = true;
      return false;
    }

  }


}
