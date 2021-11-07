import { Component, OnInit } from '@angular/core';

import { Schedule } from '../../models/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-all-my-shifts',
  templateUrl: './all-my-shifts.component.html',
  styleUrls: ['./all-my-shifts.component.css']
})
export class AllMyShiftsComponent implements OnInit {

  name: string = "Isra";
  schedulesOfEmployee: any = [];


  constructor(private ScheduleService: ScheduleService) {

    this.ScheduleService.getSchedules()
      .subscribe((data: any) => {

        this.schedulesOfEmployee = data.filter((schedule: any) => schedule.employeeName == this.name);

      })

  }


  ngOnInit(): void {
  }



}
