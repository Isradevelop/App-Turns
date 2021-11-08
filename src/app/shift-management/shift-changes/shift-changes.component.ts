import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChangesService } from 'src/app/services/changes.service';


@Component({
  selector: 'app-shift-changes',
  templateUrl: './shift-changes.component.html',
  styleUrls: ['./shift-changes.component.css']
})
export class ShiftChangesComponent implements OnInit, OnDestroy {

  isEmpty: boolean = true;

  changes: any = [];

  timerSubscription!: Subscription;

  constructor(private changesService: ChangesService) {

    this.timerSubscription = this.changesService.getChanges().subscribe(data => this.changes = data);

    this.changes ? this.isEmpty = false : this.isEmpty = true;

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
