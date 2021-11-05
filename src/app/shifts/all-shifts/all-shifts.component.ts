import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../models/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css']
})
export class AllShiftsComponent implements OnInit {

  schedules: any = [];
  currSchedules: any = [];
  previusSchedules: any = [];
  nextSchedules: any = [];
  currentWeekNumber: number = 0;

  //These variables will be used to show the previous, current and next calendars
  previus: boolean = false;
  current: boolean = true;
  next: boolean = false;



  constructor(private ScheduleService: ScheduleService) {

    let date: Date = new Date();
    let monthNumber: number = date.getUTCMonth() + 1;
    let dayNumber: number = date.getUTCDate();
    let dayAndMonth: string = dayNumber.toString() + "/" + monthNumber.toString();

    this.ScheduleService.getSchedules()
      .subscribe(data => {

        this.schedules = data;


        // search all shifts from current week
        for (let i = 0; i < this.schedules.length; i++) {

          for (let z = 0; z < this.schedules[i].dates.length; z++) {

            if (this.schedules[i].dates[z] === dayAndMonth) {

              this.currSchedules.push(this.schedules[i]);

              this.currentWeekNumber = this.schedules[i].weekNumber;

            }

          }

        }


        //search all shifts from previus week
        for (let i = 0; i < this.schedules.length; i++) {

          if (this.schedules[i].weekNumber == (this.currentWeekNumber - 1)) {

            this.previusSchedules.push(this.schedules[i]);

          }

        }


        //search all shifts from next week
        for (let i = 0; i < this.schedules.length; i++) {

          if (this.schedules[i].weekNumber == (this.currentWeekNumber + 1)) {

            this.nextSchedules.push(this.schedules[i]);

          }

        }


      });


  }

  ngOnInit(): void { }



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
