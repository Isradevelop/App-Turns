import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';
import { Shift } from '../../models/schedule.interface';

@Component({
  selector: 'app-types-shift',
  templateUrl: './types-shift.component.html',
  styleUrls: ['./types-shift.component.css']
})
export class TypesShiftComponent implements OnInit {



  constructor(private ShiftsService: ShiftsService) { }

  ngOnInit(): void {

    this.ShiftsService.allShiftsCopy()
      .subscribe(data => console.log(data));

  }


  turnos: string[][] = this.ShiftsService.allShifts;








}
