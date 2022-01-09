import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

import { ShiftsService } from 'src/app/services/shifts.service';


@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.css']
})
export class ShiftCreateComponent implements OnInit {




  myForm: FormGroup;

  mysShiftsList: any = [];

  constructor(private shiftService: ShiftsService) {

    this.myForm = new FormGroup({
      name: new FormControl(),
      shift: new FormControl(),
      nightHours: new FormControl()
    })
  }

  ngOnInit(): void {
    this.shiftService.allShifts()
      .subscribe(data => this.mysShiftsList = data);
  }

  onSubmit() {

    if (this.checkName() && this.checkEmptyShift() && this.checkEmptyNightHours()) {

      this.shiftService.createShift(this.myForm.value.name, this.myForm.value.shift, this.myForm.value.nightHours)
        .subscribe(resp => {

          if (resp.ok == false) {

            return Swal.fire({
              icon: 'error',
              title: resp.msg,
              timer: 1500

            });

          } else {

            return Swal.fire({
              icon: 'success',
              title: `Nuevo horario creado.
                        Nombre: ${this.myForm.value.name}
                        Horario: ${this.myForm.value.shift}`,
              timer: 1500

            });
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


  checkEmptyNightHours(): boolean {
    if (this.myForm.value.nightHours == null) {

      Swal.fire({
        icon: 'error',
        title: 'El número de horas nocturnas no puede estar vacío',
        timer: 2000
      });

      return false;
    }

    return true;
  }

}
