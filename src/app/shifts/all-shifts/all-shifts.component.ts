import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  previus: boolean = false;
  current: boolean = true;
  next: boolean = false;



  constructor(private ScheduleService: ScheduleService) {

    let date: Date = new Date();
    let monthNumber: number = date.getUTCMonth() + 1;
    let dayNumber: number = date.getUTCDate();
    let dayAndMonth: string = dayNumber.toString() + "/" + monthNumber.toString();

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

          if (schedule.weekNumber == (this.currentWeekNumber - 1)) {

            this.previusSchedules.push(schedule);

          }

        }


        //search all shifts from next week
        for (let schedule of this.schedules) {

          if (schedule.weekNumber == (this.currentWeekNumber + 1)) {

            this.nextSchedules.push(schedule);

          }

        }

      });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }



  previusWeek() {
    this.previus = true;
    this.current = false;
    this.next = false;
  }

  actuallyWeek() {
    this.previus = false;
    this.current = true;
    this.next = false;
  }

  nextWeek() {
    this.previus = false;
    this.current = false;
    this.next = true;
  }

}
