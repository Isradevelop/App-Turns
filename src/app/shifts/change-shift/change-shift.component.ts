import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

import { EmployeesService } from '../../services/employees.service';
import { Token } from 'src/app/models/token.interface';
import { ScheduleService } from '../../services/schedule.service';
import { Schedule } from '../../models/schedule.interface';
import { ChangesService } from 'src/app/services/changes.service';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.css']
})
export class ChangeShiftComponent implements OnInit {

  employees: any = [];
  employeesNames: string[] = [];
  timerSubscription!: Subscription;
  applicantEmployeeName: string;
  applicantSchedule: any = {};
  affectedSchedule: any = {};

  status: string = 'pending';

  myForm: FormGroup;

  constructor(private employeesService: EmployeesService,
    private scheduleService: ScheduleService,
    private changeService: ChangesService,
    private router: Router) {

    this.myForm = new FormGroup({
      affectedEmployee: new FormControl,
      changeDate: new FormControl
    });

    //almacenamos el nombre del usuario autenticado
    const token: Token = jwt_decode(localStorage.getItem('token')!);
    this.applicantEmployeeName = token.name;
  }

  ngOnInit(): void {
    //cargar el select del template
    this.employeesService.getEmployees()
      .subscribe(allEmployees => {
        allEmployees.forEach(employee => this.employeesNames.push(employee.name));

      });
  }


  createChange() {

    //formateamos la fecha del cambio dd/mm
    const arrayDate = this.myForm.value.changeDate.split("-");
    const day: string = arrayDate[2];
    const month: string = arrayDate[1];
    const changeDate = `${day}/${month}`;


    this.scheduleService.getSchedules()
      .subscribe(schedules => {

        let applicantSchedulesByName: any[] = [];
        let affectedSchedulesByName: any[] = [];


        //calendarios del solicitante del cambio
        schedules.forEach(schedule => {
          if (schedule.employeeName == this.applicantEmployeeName) {
            applicantSchedulesByName.push(schedule);
          }

          if (applicantSchedulesByName) {

            //calendario del solicitante con la fecha que se quiere cambiar
            applicantSchedulesByName.forEach((schedule: Schedule) => {
              schedule.dates.forEach(date => {
                if (date === changeDate) {
                  this.applicantSchedule = schedule;
                }
              });
            });

          }
        });


        //calendario del empleado afectado por el cambio
        schedules.forEach(schedule => {
          if (schedule.employeeName == this.myForm.value.affectedEmployee) {
            affectedSchedulesByName.push(schedule);
          }

          if (affectedSchedulesByName) {

            //calendario del solicitante con la fecha que se quiere cambiar
            affectedSchedulesByName.forEach((schedule: Schedule) => {
              schedule.dates.forEach(date => {
                if (date === changeDate) {
                  this.affectedSchedule = schedule;
                }
              });
            });

          }
        });



        this.changeService.createChange(
          this.applicantEmployeeName,
          this.myForm.value.affectedEmployee,
          this.applicantSchedule,
          this.affectedSchedule,
          changeDate,
          this.status
        )
          .subscribe(resp => {

            Swal.fire({
              icon: 'success',
              title: `Cambio creado con éxito. 
                      Recuerde que el cambio no será efectivo 
                      hasta que el usuario afectado y en encargado lo aprueben `,
              timer: 3000
            });

            this.router.navigateByUrl('/');
          });




      });
  }


}
