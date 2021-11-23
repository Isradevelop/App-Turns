import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';

import { EmployeesService } from '../../services/employees.service';
import { Token } from '../../models/token.interface';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  //this variable is used for kill the service subscription
  timerSubscription!: Subscription;

  employees: any = [];

  employeePassword: string = "";
  employee: any;

  myForm: FormGroup;

  constructor(private EmployeesService: EmployeesService,
    private authService: AuthService) {

    this.myForm = new FormGroup({
      password: new FormControl,
      newPassword: new FormControl,
      confirmPassword: new FormControl
    });


  }

  ngOnInit(): void {

    this.authService.userToken()
      .then(employee => this.employee = employee);
  }


  change(): void {

    if (this.checkOldAndNewPassword()) {

      this.EmployeesService.updatePassword(this.employee.name, this.myForm.value.newPassword)
        .subscribe();

      Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada con éxito',
        timer: 1500
      })
    }
  }


  checkOldAndNewPassword() {

    if (this.myForm.value.newPassword != null && this.myForm.value.newPassword.trim().length >= 6) {


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
        title: 'La contraseña debe tener 6 dígitos o más',
        timer: 1500
      });

      return false;
    }

  }
}
