import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { Schedule } from '../../models/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css']
})
export class AllShiftsComponent implements OnInit, OnDestroy {

  schedules: any = [];
  currSchedules: any = [];
  previusSchedules: any = [];
  nextSchedules: any = [];
  currentWeekNumber: number = 0;
  timerSubscription!: Subscription;

  //These variables will be used to show the previous, current and next calendars
  week: string = 'current';


  //this variable if there is a new week
  thereAreNextWeek: boolean = false;



  constructor(private ScheduleService: ScheduleService) {

    //we format the current date dd / mm
    let date: Date = new Date();
    let monthNumber: number = date.getUTCMonth() + 1;
    let dayNumber: number = date.getUTCDate();
    let dayAndMonth: string


    //format   d / mm   to   0d / mm
    if (dayNumber < 10 || monthNumber < 10) {
      let dayString: string = '';
      let monthString: string = '';

      if (dayNumber < 10) {
        dayString = '0' + dayNumber.toString();
      }

      if (monthNumber < 10) {
        monthString = '0' + monthNumber.toString();
      }

      if (dayString != '' && monthString != '') {

        dayAndMonth = dayString + "/" + monthString;

      } else if (dayString != '') {

        dayAndMonth = dayString + "/" + monthNumber.toString();

      } else {

        dayAndMonth = "0" + dayNumber.toString() + "/" + monthString;
      }

    } else {

      dayAndMonth = dayNumber.toString() + "/" + monthNumber.toString();
    }

    this.timerSubscription = this.ScheduleService.getSchedules()
      .subscribe(data => {

        this.schedules = data;

        // search all shifts from current week
        for (let schedule of this.schedules) {

          for (let dates of schedule.dates) {

            if (dates === dayAndMonth) {

              this.currSchedules.push(schedule);

              this.currentWeekNumber = schedule.weekNumber;

            }

          }

        }


        //search all shifts from previus week
        for (let schedule of this.schedules) {

          if (schedule.weekNumber === (this.currentWeekNumber - 1)) {

            this.previusSchedules.push(schedule);

          }

        }


        //search all shifts from next week
        for (let schedule of this.schedules) {

          if (schedule.weekNumber === (this.currentWeekNumber + 1)) {

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
