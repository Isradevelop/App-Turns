import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { EmployeesService } from 'src/app/services/employees.service';
import { Employees } from '../../models/employees.interface';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit, OnDestroy {

  employees: Employees[] = [];

  timerSubscription!: Subscription;

  myForm: FormGroup;

  constructor(private employeesService: EmployeesService,
    private router: Router) {
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


    // modal de confirmación
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "Estás a punto de borrar un empleado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeesService.deleteEmployee(this.myForm.value.name)
          .subscribe((name) => {

            swalWithBootstrapButtons.fire(
              'Usuario Borrado con éxito',
              `${this.myForm.value.name}`,
              'success'
            )
          });

        this.router.navigateByUrl('/');
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Operación cancelada',
          'No se realizará ninguna operación',
          'error'
        )
      }



    })



  }

}
