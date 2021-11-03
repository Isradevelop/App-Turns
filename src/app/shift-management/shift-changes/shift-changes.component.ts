import { Component, OnInit } from '@angular/core';

import { ChangesService } from 'src/app/services/changes.service';
import { Change } from '../../models/change.interface';

@Component({
  selector: 'app-shift-changes',
  templateUrl: './shift-changes.component.html',
  styleUrls: ['./shift-changes.component.css']
})
export class ShiftChangesComponent implements OnInit {

  isEmpty: boolean = false;

  constructor(private changesService: ChangesService) {
    this.check(this.changes);
  }

  ngOnInit(): void {
  }

  changes: Change[] = this.changesService.changes;



  check(changes: Change[]) {

    changes.length == 0 ? this.isEmpty = true : this.isEmpty = false;

  }


}
