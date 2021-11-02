import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css']
})
export class AllShiftsComponent implements OnInit {

  horarios: string[][] = [
    [
      'Israel', 'P-1', 'P9-19', 'M-9', 'P-2', 'M', 'D', 'D'
    ],
    [
      'Dani', 'P-1', 'P9-19', 'M-9', 'P-2', 'M', 'D', 'D'
    ],
    [
      'Jessi', 'P-1', 'P9-19', 'M-9', 'P-2', 'M', 'D', 'D'
    ],
    [
      'Riki', 'P-1', 'P9-19', 'M-9', 'P-2', 'M', 'D', 'D'
    ]
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
