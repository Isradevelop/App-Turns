import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.css']
})
export class MyShiftComponent implements OnInit, OnDestroy {

  days: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  employeeName: string = "Isra";
  employeeSchedules: any = [];
  employeeSchedule: any;
  timerSubscription!: Subscription;


  constructor(private ScheduleService: ScheduleService) {

    let date: Date = new Date();
    let monthNumber: number = date.getUTCMonth() + 1;
    let dayNumber: number = date.getUTCDate();
    let dayAndMonth: string = dayNumber.toString() + "/" + monthNumber.toString();


    this.timerSubscription = this.ScheduleService.getSchedules()
      .subscribe(data => {

        this.employeeSchedules = data;

        for (let schedule of this.employeeSchedules) {

          for (let dates of schedule.dates) {

            if (dates === dayAndMonth && schedule.employeeName == this.employeeName) {

              this.employeeSchedule = schedule;

            }

          }

        }

      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
