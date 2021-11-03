import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private allSchedules: Schedule[] = [
    {
      "weekNumber": 5,
      "employeeName": "Dani",
      "dates": [
        "01/11",
        "02/11",
        "03/11",
        "04/11",
        "05/11",
        "06/11",
        "07/11"
      ],
      "shifts":
      {
        "monday": "P-1",
        "tuesday": "M",
        "wednesday": "P-2",
        "thursday": "D",
        "friday": "D",
        "saturday": "M",
        "sunday": "P-1"
      }
    },
    {
      "weekNumber": 5,
      "employeeName": "Riki",
      "dates": [
        "01/11",
        "02/11",
        "03/11",
        "04/11",
        "05/11",
        "06/11",
        "07/11"
      ],
      "shifts":
      {
        "monday": "P-1",
        "tuesday": "M",
        "wednesday": "P-2",
        "thursday": "D",
        "friday": "D",
        "saturday": "M",
        "sunday": "P-1"
      }
    },
    {
      "weekNumber": 4,
      "employeeName": "Riki",
      "dates": [
        "01/11",
        "02/11",
        "03/11",
        "04/11",
        "05/11",
        "06/11",
        "07/11"
      ],
      "shifts":
      {
        "monday": "P-1",
        "tuesday": "M",
        "wednesday": "P-2",
        "thursday": "D",
        "friday": "D",
        "saturday": "M",
        "sunday": "P-1"
      }
    },
    {
      "weekNumber": 4,
      "employeeName": "Dani",
      "dates": [
        "01/11",
        "02/11",
        "03/11",
        "04/11",
        "05/11",
        "06/11",
        "07/11"
      ],
      "shifts":
      {
        "monday": "P-1",
        "tuesday": "M",
        "wednesday": "P-2",
        "thursday": "D",
        "friday": "D",
        "saturday": "M",
        "sunday": "P-1"
      }
    },
    {
      "weekNumber": 6,
      "employeeName": "Dani",
      "dates": [
        "01/11",
        "02/11",
        "03/11",
        "04/11",
        "05/11",
        "06/11",
        "07/11"
      ],
      "shifts":
      {
        "monday": "P-1",
        "tuesday": "M",
        "wednesday": "P-2",
        "thursday": "D",
        "friday": "D",
        "saturday": "M",
        "sunday": "P-1"
      }
    },
    {
      "weekNumber": 6,
      "employeeName": "Riki",
      "dates": [
        "01/11",
        "02/11",
        "03/11",
        "04/11",
        "05/11",
        "06/11",
        "07/11"
      ],
      "shifts":
      {
        "monday": "P-1",
        "tuesday": "M",
        "wednesday": "P-2",
        "thursday": "D",
        "friday": "D",
        "saturday": "M",
        "sunday": "P-1"
      }
    },
    {
      "weekNumber": 5,
      "employeeName": "Isra",
      "dates": [
        "01/11",
        "02/11",
        "03/11",
        "04/11",
        "05/11",
        "06/11",
        "07/11"
      ],
      "shifts":
      {
        "monday": "P-1",
        "tuesday": "M",
        "wednesday": "P-2",
        "thursday": "D",
        "friday": "D",
        "saturday": "M",
        "sunday": "P-1"
      }
    }
  ]

  constructor() { }


  schedulesForWeek(week: number): Schedule[] {

    let schedules: Schedule[] = [];

    for (let i = 0; i < this.allSchedules.length; i++) {

      if (this.allSchedules[i].weekNumber === week) {

        let schedule = this.allSchedules[i];

        schedules.push(schedule);
      }
    }

    return schedules;
  }



  schedulesForNameAndWek(name: string, week: number): Schedule {

    let schedules: any = {};

    for (let i = 0; i < this.allSchedules.length; i++) {

      if (this.allSchedules[i].weekNumber === week && this.allSchedules[i].employeeName === name) {

        let schedule: Schedule = this.allSchedules[i];

        schedules = schedule;
      }
    }

    return schedules;
  }


  schedulesForName(name: string): Schedule[] {

    let schedules: Schedule[] = [];

    for (let i = 0; i < this.allSchedules.length; i++) {

      if (this.allSchedules[i].employeeName === name) {

        let schedule: Schedule = this.allSchedules[i];

        schedules.push(schedule);
      }
    }

    return schedules;
  }

}
