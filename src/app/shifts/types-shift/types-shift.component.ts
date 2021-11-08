import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShiftsService } from '../../services/shifts.service';


@Component({
  selector: 'app-types-shift',
  templateUrl: './types-shift.component.html',
  styleUrls: ['./types-shift.component.css']
})
export class TypesShiftComponent implements OnInit, OnDestroy {

  public shiftsEnabled: any;
  timerSubscription!: Subscription;

  constructor(private ShiftsService: ShiftsService) {
  }

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
