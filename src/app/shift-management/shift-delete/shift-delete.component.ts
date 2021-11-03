import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';

@Component({
  selector: 'app-shift-delete',
  templateUrl: './shift-delete.component.html',
  styleUrls: ['./shift-delete.component.css']
})
export class ShiftDeleteComponent implements OnInit {



  constructor(private ShiftsService: ShiftsService) { }

  ngOnInit(): void { }

  shifts: string[][] = this.ShiftsService.allShifts;

}
