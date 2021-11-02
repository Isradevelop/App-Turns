import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-my-shifts',
  templateUrl: './all-my-shifts.component.html',
  styleUrls: ['./all-my-shifts.component.css']
})
export class AllMyShiftsComponent implements OnInit {

  historialTurnos: string[][] = [
    [
      '1', 'P-1', 'P9-19', 'M-9', 'P-2', 'M', 'D', 'D'
    ],
    [
      '2', 'P-1', 'P9-19', 'M-9', 'P-2', 'M', 'D', 'D'
    ],
    [
      '3', 'P-1', 'P9-19', 'M-9', 'P-2', 'M', 'D', 'D'
    ],
    [
      '4', 'P-1', 'P9-19', 'M-9', 'P-2', 'M', 'D', 'D'
    ]
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
