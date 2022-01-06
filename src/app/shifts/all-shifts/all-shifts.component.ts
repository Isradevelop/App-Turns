import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ScheduleService } from '../../services/schedule.service';
import * as moment from 'moment';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css']
})
export class AllShiftsComponent implements OnInit, OnDestroy {


  schedules: any = [];
  currSchedules: any[] = [];
  previusSchedules: any[] = [];
  nextSchedules: any[] = [];
  currentWeekNumber: number = moment().isoWeek();
  previusWeekNumber: number = moment().subtract(7, 'days').isoWeek();
  nextWeekNumber: number = moment().add(7, 'days').isoWeek();
  timerSubscription!: Subscription;

  //These variables will be used to show the previous, current and next calendars
  week: string = 'current';


  //this variable if there is a new week
  thereAreNextWeek: boolean = false;



  constructor(private ScheduleService: ScheduleService) {


    this.timerSubscription = this.ScheduleService.getSchedules()
      .subscribe(data => {

        this.schedules = data;

        // search all shifts from current week
        for (let schedule of this.schedules) {

          if (schedule.weekNumber === this.currentWeekNumber) {
            this.currSchedules.push(schedule);
          }

        }


        //search all shifts from previus week
        for (let schedule of this.schedules) {

          if (schedule.weekNumber === this.previusWeekNumber) {

            this.previusSchedules.push(schedule);

          }

        }


        //search all shifts from next week
        for (let schedule of this.schedules) {

          if (schedule.weekNumber === this.nextWeekNumber) {

            this.nextSchedules.push(schedule);
            this.thereAreNextWeek = true;
          }

        }

      });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }


  getWeek(week: string) {
    this.week = week;
  }



}
