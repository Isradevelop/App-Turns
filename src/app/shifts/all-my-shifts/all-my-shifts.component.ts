import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Token } from 'src/app/models/token.interface';


import { ScheduleService } from '../../services/schedule.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-all-my-shifts',
  templateUrl: './all-my-shifts.component.html',
  styleUrls: ['./all-my-shifts.component.css']
})
export class AllMyShiftsComponent implements OnInit, OnDestroy {

  employeeName: string = "";
  schedulesOfEmployee: any = [];
  timerSubscription!: Subscription;




  constructor(private ScheduleService: ScheduleService) {
    this.timerSubscription = this.ScheduleService.getSchedules()
      .subscribe((data: any) => {

        const token: Token = jwt_decode(localStorage.getItem('token')!);

        this.employeeName = token.name;

        this.schedulesOfEmployee = data.filter((schedule: any) => schedule.employeeName == this.employeeName);

      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
