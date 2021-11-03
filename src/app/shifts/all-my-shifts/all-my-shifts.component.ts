import { Component, OnInit } from '@angular/core';

import { Schedule } from '../../models/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-all-my-shifts',
  templateUrl: './all-my-shifts.component.html',
  styleUrls: ['./all-my-shifts.component.css']
})
export class AllMyShiftsComponent implements OnInit {



  constructor(private ScheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

  shiftHistory: Schedule[] = this.ScheduleService.schedulesForName("Dani")

}
