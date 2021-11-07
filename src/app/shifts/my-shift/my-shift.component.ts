import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../models/schedule.interface';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.css']
})
export class MyShiftComponent implements OnInit {

  days: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  employeeName: string = "Isra";
  employeeSchedules: any = [];
  employeeSchedule: any;


  constructor(private ScheduleService: ScheduleService) {

    let date: Date = new Date();
    let monthNumber: number = date.getUTCMonth() + 1;
    let dayNumber: number = date.getUTCDate();
    let dayAndMonth: string = dayNumber.toString() + "/" + monthNumber.toString();


    this.ScheduleService.getSchedules()
      .subscribe(data => {

        this.employeeSchedules = data;

        for (let schedule of this.employeeSchedules) {

          for (let dates of schedule.dates) {

            if (dates === dayAndMonth && schedule.employeeName == this.employeeName) {

              this.employeeSchedule = schedule;

            }

          }

        }

      });
  }

  ngOnInit(): void {
  }






}
