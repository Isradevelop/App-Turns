import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EmployeesService } from '../../services/employees.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {

  isNotSamePassword: boolean = false;
  isNotValidName: boolean = false;
  isNotEmptyName: boolean = false;
  isNotEmptyPassword: boolean = false;

  timerSubscription!: Subscription;

  employees: any = [];

  myForm: FormGroup;

  constructor(private EmployeesService: EmployeesService,
    private router: Router) {
    this.myForm = new FormGroup({
      name: new FormControl,
      email: new FormControl,
      isABoss: new FormControl,
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

      const { name, password, email, isABoss } = this.myForm.value;

      this.EmployeesService.createEmployee(name, password, email, isABoss)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: `
            Usuario creado!!
            Nombre: ${name},
            Email: ${email}
              `,
            showConfirmButton: true,
            timer: 5000
          });

          this.router.navigateByUrl('/');
        })

    }

  }





  checkName(): boolean {
    if (this.myForm.value.name != null) {
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
    } else {
      this.isNotEmptyName = true;
      return false;
    }

  }


  checkPassword(): boolean {
    if (this.myForm.value.password != null) {
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
    } else {
      this.isNotEmptyPassword = true;
      return false
    }


  }


}
