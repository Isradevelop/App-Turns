import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShiftsService } from '../../services/shifts.service';

@Component({
  selector: 'app-shift-delete',
  templateUrl: './shift-delete.component.html',
  styleUrls: ['./shift-delete.component.css']
})
export class ShiftDeleteComponent implements OnInit, OnDestroy {

  shiftsEnabled: any;

  timerSubscription!: Subscription;

  constructor(private ShiftsService: ShiftsService) { }

  ngOnInit(): void {
    this.timerSubscription = this.ShiftsService.allShifts()
      .subscribe(data => {
        this.shiftsEnabled = data;
      });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
