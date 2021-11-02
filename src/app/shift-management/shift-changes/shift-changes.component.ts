import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shift-changes',
  templateUrl: './shift-changes.component.html',
  styleUrls: ['./shift-changes.component.css']
})
export class ShiftChangesComponent implements OnInit {

  isEmpty: boolean = true;



  changes: object[] = [{}];

  constructor() { }

  ngOnInit(): void {
  }

}
