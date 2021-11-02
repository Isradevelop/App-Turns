import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-types-shift',
  templateUrl: './types-shift.component.html',
  styleUrls: ['./types-shift.component.css']
})
export class TypesShiftComponent implements OnInit {

  turnos: string[][] = [
    ['M', '8:00 - 16:00'],
    ['M-9', '9:00 - 17:00'],
    ['P9/19', '8:30-12:00 / 19:30-23:30'],
    ['P-1', '9:00-15:00 / 20:00-22:00'],
    ['P-2', '9:00-15:00 / 21:00-23:00']
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
