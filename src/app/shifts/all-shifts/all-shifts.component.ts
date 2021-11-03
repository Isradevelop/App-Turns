import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../models/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css']
})
export class AllShiftsComponent implements OnInit {


  constructor(private ScheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

  currentSchedule: Schedule[] = this.ScheduleService.schedulesForWeek(5);

}
