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
  employeeSchedule: any = [];


  constructor(private ScheduleService: ScheduleService) {

    let date: Date = new Date();
    let monthNumber: number = date.getUTCMonth() + 1;
    let dayNumber: number = date.getUTCDate();
    let dayAndMonth: string = dayNumber.toString() + "/" + monthNumber.toString();


    this.ScheduleService.getSchedules()
      .subscribe(data => {

        this.employeeSchedule = data;

        for (let i = 0; i < this.employeeSchedule.length; i++) {

          for (let z = 0; z < this.employeeSchedule[i].dates.length; z++) {

            if (this.employeeSchedule[i].dates[z] === dayAndMonth && this.employeeSchedule[i].employeeName == this.employeeName) {

              this.employeeSchedule = this.employeeSchedule[i];

            }

          }

        }

      });
  }

  ngOnInit(): void {
  }






}
