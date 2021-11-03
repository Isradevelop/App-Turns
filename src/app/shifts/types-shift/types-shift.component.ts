import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';

@Component({
  selector: 'app-types-shift',
  templateUrl: './types-shift.component.html',
  styleUrls: ['./types-shift.component.css']
})
export class TypesShiftComponent implements OnInit {



  constructor(private ShiftsService: ShiftsService) { }

  ngOnInit(): void {
  }


  turnos: string[][] = this.ShiftsService.allShifts;

}
