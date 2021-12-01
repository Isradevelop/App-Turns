import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

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
    private changeService: ChangesService) {

    this.myForm = new FormGroup({
      affectedEmployee: new FormControl,
      changeDate: new FormControl
    });

    //we store the name of the authenticated user
    const token: Token = jwt_decode(localStorage.getItem('token')!);
    this.applicantEmployeeName = token.name;
  }

  ngOnInit(): void {
    //load the template's select
    this.employeesService.getEmployees()
      .subscribe(allEmployees => {
        allEmployees.forEach((employee: any) => this.employeesNames.push(employee.name));

      });
  }


  createChange() {

    //we format the current date dd / mm
    const arrayDate = this.myForm.value.changeDate.split("-");
    const day: string = arrayDate[2];
    const month: string = arrayDate[1];
    const changeDate = `${day}/${month}`;


    this.scheduleService.getSchedules()
      .subscribe(schedules => {

        let applicantSchedulesByName: any[] = [];
        let affectedSchedulesByName: any[] = [];


        //change requester calendars
        schedules.forEach((schedule: any) => {
          if (schedule.employeeName == this.applicantEmployeeName) {
            applicantSchedulesByName.push(schedule);
          }

          if (applicantSchedulesByName) {

            //applicant's calendar with the date you want to change
            applicantSchedulesByName.forEach((schedule: Schedule) => {
              schedule.dates.forEach(date => {
                if (date === changeDate) {
                  this.applicantSchedule = schedule;
                }
              });
            });

          }
        });


        //schedules of the employee affected by the change
        schedules.forEach((schedule: any) => {
          if (schedule.employeeName == this.myForm.value.affectedEmployee) {
            affectedSchedulesByName.push(schedule);
          }

          if (affectedSchedulesByName) {

            //applicant's calendar with the date you want to change
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
        ).subscribe()


        Swal.fire({
          icon: 'success',
          title: `Cambio creado con éxito. 
                      Recuerde que el cambio no será efectivo 
                      hasta que el usuario afectado y en encargado lo aprueben `,
          timer: 3000
        });



      });
  }

}
