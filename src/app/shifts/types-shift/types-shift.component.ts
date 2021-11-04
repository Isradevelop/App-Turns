import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';


@Component({
  selector: 'app-types-shift',
  templateUrl: './types-shift.component.html',
  styleUrls: ['./types-shift.component.css']
})
export class TypesShiftComponent implements OnInit {

  public shiftsEnabled: any;

  constructor(private ShiftsService: ShiftsService) {
  }

  ngOnInit(): void {

    this.ShiftsService.allShifts()
      .subscribe(data => {
        this.shiftsEnabled = data;
      });
  }



}
