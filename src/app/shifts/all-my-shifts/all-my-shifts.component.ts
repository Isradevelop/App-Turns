import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-all-my-shifts',
  templateUrl: './all-my-shifts.component.html',
  styleUrls: ['./all-my-shifts.component.css']
})
export class AllMyShiftsComponent implements OnInit, OnDestroy {

  name: string = "Isra";
  schedulesOfEmployee: any = [];
  timerSubscription!: Subscription;




  constructor(private ScheduleService: ScheduleService) {
    this.timerSubscription = this.ScheduleService.getSchedules()
      .subscribe((data: any) => {

        this.schedulesOfEmployee = data.filter((schedule: any) => schedule.employeeName == this.name);

      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
