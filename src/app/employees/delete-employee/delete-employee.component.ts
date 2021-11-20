import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { EmployeesService } from 'src/app/services/employees.service';
import { Employees } from '../../models/employees.interface';
import swal from 'sweetalert2';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit, OnDestroy {

  employees: Employees[] = [];

  timerSubscription!: Subscription;

  myForm: FormGroup;

  constructor(private employeesService: EmployeesService) {
    this.myForm = new FormGroup({
      name: new FormControl,
    });
  }

  ngOnInit(): void {

    this.timerSubscription = this.employeesService.getEmployees()
      .subscribe((data: Employees[]) => {

        this.employees = data;
      })

  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  deleteEmployee() {

    const name = this.myForm.value.name;

    if (name === null) {
      swal.fire({
        icon: 'error',
        title: 'El usuario introducido es incorrecto, por favor inténtalo de nuevo',
        showConfirmButton: false,
        timer: 1500
      })

      return
    }

    this.employeesService.deleteEmployee(this.myForm.value.name)
      .subscribe(name => {
        swal.fire({
          icon: 'success',
          title: `
            Usuario Borrado!!
            Nombre: ${name},
              `,
          showConfirmButton: true,
          timer: 5000
        });

        this.employeesService.getEmployees()
          .subscribe((data: Employees[]) => {

            this.employees = data;
          })
      })



  }

}
