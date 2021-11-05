import { Component, OnInit } from '@angular/core';

import { ChangesService } from 'src/app/services/changes.service';
import { Change } from '../../models/change.interface';

@Component({
  selector: 'app-shift-changes',
  templateUrl: './shift-changes.component.html',
  styleUrls: ['./shift-changes.component.css']
})
export class ShiftChangesComponent implements OnInit {

  isEmpty: boolean = true;

  changes: any = [];

  constructor(private changesService: ChangesService) {


    this.changesService.getChanges().subscribe(data => this.changes = data);

    this.changes ? this.isEmpty = false : this.isEmpty = true;

  }

  ngOnInit(): void {
  }




}
