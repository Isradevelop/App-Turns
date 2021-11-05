import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  isSamePassword: boolean = true;
  isValidName: boolean = true;
  showMessage: boolean = false;

  employees: any = [];


  constructor(private EmployeesService: EmployeesService) { }

  ngOnInit(): void {
    this.EmployeesService.getEmployees()
      .subscribe(data => { this.employees = data })


  }


  myForm: FormGroup = new FormGroup({
    name: new FormControl,
    password: new FormControl,
    confirmPassword: new FormControl
  });



  createEmployee() {

    this.checkName(this.myForm.value.name);

    this.checkPassword(this.myForm.value.password, this.myForm.value.confirmPassword);

    if (this.isValidName && this.isSamePassword) {

      this.EmployeesService.createEmployee(this.myForm.value.name, this.myForm.value.password);

      this.showMessage = true;
    }


  }



  checkName(name: string): void {

    let names: string[] = [];


    //save the names in the variable name
    for (let i = 0; i < this.employees.length; i++) {

      names.push(this.employees[i].name)

    }



    for (let i = 0; i < names.length; i++) {

      if (names[i] == name) {

        this.isValidName = false;

        break;
      }


    }


  }




  checkPassword(password: string, confirmPassword: string): void {

    password === confirmPassword ? this.isSamePassword = true : this.isSamePassword = false;

  }




}
