import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../models/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.css']
})
export class MyShiftComponent implements OnInit {

  days: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];


  constructor(private ScheduleService: ScheduleService) { }

  ngOnInit(): void {
  }


  shift: Schedule = this.ScheduleService.schedulesForNameAndWek('Isra', 5);

  shifts: string[] = [
    this.shift.shifts.monday,
    this.shift.shifts.tuesday,
    this.shift.shifts.wednesday,
    this.shift.shifts.thursday,
    this.shift.shifts.friday,
    this.shift.shifts.saturday,
    this.shift.shifts.sunday,
  ];

}
