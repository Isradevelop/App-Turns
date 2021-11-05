import { Component, OnInit } from '@angular/core';

import { Schedule } from '../../models/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-all-my-shifts',
  templateUrl: './all-my-shifts.component.html',
  styleUrls: ['./all-my-shifts.component.css']
})
export class AllMyShiftsComponent implements OnInit {


  schedules: any = [];
  name: string = "Isra";
  schedulesOfEmployee: any = [];


  constructor(private ScheduleService: ScheduleService) {

    this.ScheduleService.getSchedules()
      .subscribe(data => {
        this.schedules = data

        for (let i = 0; i < this.schedules.length; i++) {

          if (this.schedules[i].employeeName == this.name) {

            this.schedulesOfEmployee.push(this.schedules[i])

          }

        }
      })

  }


  ngOnInit(): void {
  }



}
