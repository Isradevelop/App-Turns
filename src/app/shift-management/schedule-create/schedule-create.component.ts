import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import * as moment from 'moment';

import { ShiftsService } from '../../services/shifts.service';
import { EmployeesService } from '../../services/employees.service';
import { ScheduleService } from '../../services/schedule.service';



@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {

  myForm: FormGroup;
  shiftsNames: string[] = [];
  employeeNames: string[] = [];

  constructor(private shiftService: ShiftsService,
    private employeeService: EmployeesService,
    private scheduleService: ScheduleService,
    private fb: FormBuilder) {


    this.myForm = this.fb.group({
      from: ['', Validators.required],
      employeeName: ['', Validators.required],
      mondayShift: ['', Validators.required],
      tuesdayShift: ['', Validators.required],
      wednesdayShift: ['', Validators.required],
      thursdayShift: ['', Validators.required],
      fridayShift: ['', Validators.required],
      saturdayShift: ['', Validators.required],
      sundayShift: ['', Validators.required],
    });

  }

  ngOnInit(): void {

    //select of employee name
    this.employeeService.getEmployeesNames()
      .subscribe((employeeNames: string[]) => {
        this.employeeNames = employeeNames;
      });

    //selects of shifts
    this.shiftService.allShiftsNames()
      .subscribe((allShiftsNames: string[]) => {
        this.shiftsNames = allShiftsNames;
      });

  }

  onSubmit() {
    //form references
    const employeeName: string = this.myForm.value.employeeName;
    const from: string = this.myForm.value.from;
    const mondayShift: string = this.myForm.value.mondayShift;
    const tuesdayShift: string = this.myForm.value.tuesdayShift;
    const wednesdayShift: string = this.myForm.value.wednesdayShift;
    const thursdayShift: string = this.myForm.value.thursdayShift;
    const fridayShift: string = this.myForm.value.fridayShift;
    const saturdayShift: string = this.myForm.value.saturdayShift;
    const sundayShift: string = this.myForm.value.sundayShift;

    const fromList = from.split('-');

    const day = parseInt(fromList[2]);
    const year = parseInt(fromList[0]);
    const month = parseInt(fromList[1]);
    const dates: string[] = [];

    // validations
    if (from.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Por favor introduce fecha',
        timer: 2500
      });
    } else {

      if (employeeName.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Por favor introduce empleado',
          timer: 2500
        });
      } else {

        if (mondayShift.length === 0 || tuesdayShift.length === 0 || wednesdayShift.length === 0 || thursdayShift.length === 0 || fridayShift.length === 0 || saturdayShift.length === 0 || sundayShift.length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Por favor introduce turnos',
            timer: 2500
          });
        } else {

          // charge array dates with moment.js
          let date = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");

          for (let i = 0; i < 7; i++) {
            dates.push(date.format("DD/MM"));
            date.add(1, 'd');
          }

          const shifts: string[] = [mondayShift, tuesdayShift, wednesdayShift, thursdayShift, fridayShift, saturdayShift, sundayShift];


          this.scheduleService.createSchedule(employeeName, dates, shifts, fromList[0], fromList[1])
            .subscribe(schedule => {
              if (schedule.ok == true) {
                Swal.fire({
                  icon: 'success',
                  title: 'Calendario creado con éxito',
                  timer: 2500
                })
              } else {

                Swal.fire({
                  icon: 'error',
                  title: schedule.error.msg,
                  timer: 2500
                });
              }
            })
        }

      }
    }
  }
}
