import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Employees } from 'src/app/models/employees.interface';
import { Schedule } from 'src/app/models/schedule.interface';
import { EmployeesService } from 'src/app/services/employees.service';
import Swal from 'sweetalert2';
import { ScheduleService } from '../../services/schedule.service';
import { ShiftsService } from '../../services/shifts.service';
import { Shift } from '../../models/shift.interface';

@Component({
  selector: 'app-night-hours',
  templateUrl: './night-hours.component.html',
  styles: [
  ]
})
export class NightHoursComponent implements OnInit {

  myForm: FormGroup;
  employees: Employees[] = [];
  schedules: any = [];
  shifts: Shift[] = [];
  hasSchedules: boolean = false;

  constructor(private employeesService: EmployeesService,
    private scheduleService: ScheduleService,
    private shiftService: ShiftsService) {

    this.myForm = new FormGroup({
      name: new FormControl,
    });
  }

  ngOnInit(): void {
    this.employeesService.getEmployees()
      .subscribe((data: Employees[]) => {

        this.employees = data;
      })
  }


  onSubmit() {
    const name = this.myForm.value.name;
    this.schedules = [];

    if (name === null) {
      Swal.fire({
        icon: 'error',
        title: 'El usuario introducido es incorrecto, por favor inténtalo de nuevo',
        showConfirmButton: false,
        timer: 1500
      })

      return;
    }

    this.shiftService.allShifts()
      .subscribe((shifts: Shift[]) => {
        this.shifts = shifts;
        console.log(shifts);
      })


    this.scheduleService.getScheduleByEmployeeName(name)
      .subscribe((schedules: Schedule[]) => {

        if (schedules.length > 0) {

          this.hasSchedules = true;

          schedules.forEach(schedule => {
            let counter: number = 0;

            schedule.shifts.forEach(scheduleShift => {

              this.shifts.forEach(aviableShift => {
                if (aviableShift.name == scheduleShift) {
                  counter += aviableShift.nightHours;
                }
              })
            })

            const customSchedule: object = {
              'from': schedule.dates[0],
              'to': schedule.dates[schedule.dates.length - 1],
              'nightHours': counter
            };

            this.schedules.push(customSchedule);
          })
          console.log(this.schedules);

        } else {
          Swal.fire({
            icon: 'error',
            title: 'El empleado introducido no tiene ningún calendario',
            showConfirmButton: false,
            timer: 1500
          })

          return;
        }

      })


  }

}
