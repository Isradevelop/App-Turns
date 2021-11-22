import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';

import { Shift } from 'src/app/models/shift.interface';
import { ShiftsService } from 'src/app/services/shifts.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.css']
})
export class ShiftCreateComponent implements OnInit {




  myForm: FormGroup;

  mysShiftsList: any = [];

  constructor(private shiftService: ShiftsService,
    private router: Router) {

    this.myForm = new FormGroup({
      name: new FormControl(),
      shift: new FormControl()
    })
  }

  ngOnInit(): void {
    this.shiftService.allShifts()
      .subscribe(data => this.mysShiftsList = data);
  }

  createShift() {

    if (this.checkName() && this.checkEmptyShift()) {

      this.shiftService.createShift(this.myForm.value.name, this.myForm.value.shift)
        .subscribe(resp => {

          if (resp.ok == false) {

            return Swal.fire({
              icon: 'error',
              title: resp.msg,
              timer: 1500

            });

          } else {

            Swal.fire({
              icon: 'success',
              title: `Nuevo horario creado.
                        Nombre: ${this.myForm.value.name}
                        Horario: ${this.myForm.value.shift}`,
              timer: 1500

            });

            this.router.navigateByUrl('/shifts/typesShifts');

            return;
          }


        });


    }
  }

  checkName(): boolean {
    if (this.myForm.value.name == null) {

      Swal.fire({
        icon: 'error',
        title: 'El campo nombre no puede estar vacío',
        timer: 1500
      });

      return false;

    } else {

      if (!this.myForm.value.name.trim()) {

        Swal.fire({
          icon: 'error',
          title: 'El campo nombre no puede estar vacío',
          timer: 1500
        });

        return false;

      } else {
        return true;
      }
    }

  }

  checkEmptyShift(): boolean {
    if (this.myForm.value.shift != null) {
      if (this.myForm.value.shift.trim()) {
        return true;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'El horario no puede estar vacío',
          timer: 1500
        });

        return false;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'El horario no puede estar vacío',
        timer: 1500
      });

      return false;
    }

  }

}
