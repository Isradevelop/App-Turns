import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { ShiftsService } from '../../services/shifts.service';

@Component({
  selector: 'app-shift-delete',
  templateUrl: './shift-delete.component.html',
  styleUrls: ['./shift-delete.component.css']
})
export class ShiftDeleteComponent implements OnInit, OnDestroy {

  shiftsEnabled: any;

  timerSubscription!: Subscription;

  constructor(private ShiftsService: ShiftsService) { }

  ngOnInit(): void {
    this.timerSubscription = this.ShiftsService.allShifts()
      .subscribe(data => {
        this.shiftsEnabled = data;
      });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  deleteShift(id: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "Estás a punto de borrar un turno",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.ShiftsService.deleteShift(id)
          .subscribe(resp => {
            if (resp.ok === true) {

              swalWithBootstrapButtons.fire(
                'Turno borrado con éxito',
                `Turno borrado`,
                'success'

              )
            } else {

              swalWithBootstrapButtons.fire(
                'No se pudo borrar el turno, hable con el administrador',
                `Turno borrado`,
                'error'

              )
            }
          });


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

    });
  }
}
