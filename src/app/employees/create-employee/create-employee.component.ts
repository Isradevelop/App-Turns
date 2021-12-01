import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { EmployeesService } from '../../services/employees.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {



  timerSubscription!: Subscription;

  employees: any = [];

  myForm: FormGroup;

  constructor(private EmployeesService: EmployeesService) {
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

  onSubmit(): void {

    if (this.checkName() && this.checkEmail() && this.checkIsABoss() && this.checkPassword()) {

      const { name, password, email, isABoss } = this.myForm.value;

      this.EmployeesService.createEmployee(name, password, email, isABoss)
        .subscribe(resp => {

          //we check if the email is well formed
          if (resp.ok == false) {

            Swal.fire({
              icon: 'error',
              title: 'El email no tiene un formato válido',
              showConfirmButton: true,
              timer: 5000
            });

          } else {
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


          }

        })

    }

  }





  checkName(): boolean {
    if (this.myForm.value.name != null && this.myForm.value.name.trim()) {

      if (this.employees.find((employee: any) => employee.name == this.myForm.get('name')?.value) == undefined) {
        return true;
      } else {
        Swal.fire({
          icon: 'error',
          title: `Ya existe empleado con nombre: ${this.myForm.value.name}`,
          timer: 2000
        });

        return false;
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'El nombre no puede estar vacío',
      timer: 2000
    });

    return false;

  }


  checkEmail(): boolean {
    if (this.myForm.value.email != null && this.myForm.value.email.trim()) {

      if (this.employees.find((employee: any) => employee.email == this.myForm.get('email')?.value) == undefined) {

        return true;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ya existe ese email',
          timer: 2000
        });

        return false;
      }
    }
    Swal.fire({
      icon: 'error',
      title: 'El email no puede estar vacío',
      timer: 2000
    });

    return false;


  }


  checkIsABoss(): boolean {
    if (this.myForm.value.isABoss != null) {

      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'El tipo de empleado no puede estar vacío',
        timer: 2000
      });
      return false
    }


  }


  checkPassword(): boolean {
    const pass: String = this.myForm.value.password;
    if (this.myForm.value.password != null && this.myForm.value.password.trim() && pass.length >= 6) {

      if (this.myForm.value.password === this.myForm.value.confirmPassword) {

        return true;

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Las contraseñas deben ser iguales',
          timer: 2000
        });
        return false;

      }
    } else {

      Swal.fire({
        icon: 'error',
        title: 'La contraseña debe tener como mínimo 6 caracteres',
        timer: 2000
      });
      return false

    }



  }


}
