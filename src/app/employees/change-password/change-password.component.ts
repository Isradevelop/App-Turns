import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

import { EmployeesService } from '../../services/employees.service';
import { Token } from '../../models/token.interface';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  //this variable is used for kill the service subscription
  timerSubscription!: Subscription;

  employees: any = [];

  employeePassword: string = "";
  employeeName: string = '';

  myForm: FormGroup;

  constructor(private EmployeesService: EmployeesService) {

    this.myForm = new FormGroup({
      password: new FormControl,
      newPassword: new FormControl,
      confirmPassword: new FormControl
    });


  }

  ngOnInit(): void {
    this.timerSubscription = this.EmployeesService.getEmployees()
      .subscribe(data => {
        this.employees = data;

        const token: Token = jwt_decode(localStorage.getItem('token')!);

        let employee = this.employees.find((employee: any) => employee.name == token.name)


        this.employeeName = employee.name;


      });

  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  change(): void {

    if (this.checkOldAndNewPassword()) {

      this.EmployeesService.updatePassword(this.employeeName, this.myForm.value.newPassword)
        .subscribe();

      Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada con éxito',
        timer: 1500
      })

    }
  }


  checkOldAndNewPassword() {

    if (this.myForm.value.newPassword) {

      if (this.myForm.value.newPassword != this.myForm.value.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Las contraseñas deben ser iguales',
          timer: 1500
        });

        return false;

      } else {
        return true;
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Por favor introduce contraseña',
        timer: 1500
      });

      return false;
    }

  }
}
