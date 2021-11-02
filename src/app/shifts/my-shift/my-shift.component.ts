import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.css']
})
export class MyShiftComponent implements OnInit {

  turnos: string[][] = [
    ['Lunes', '01/11/2021', 'P-9/19'],
    ['Martes', '02/11/2021', 'P-1'],
    ['Miércoles', '03/11/2021', 'P-1'],
    ['Jueves', '04/11/2021', 'P-2'],
    ['Viernes', '05/11/2021', 'P9/19'],
    ['Sábado', '06/11/2021', 'D'],
    ['Domingo', '07/11/2021', 'D'],
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
