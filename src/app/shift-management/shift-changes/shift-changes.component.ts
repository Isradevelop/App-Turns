import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Change } from 'src/app/models/change.interface';

import { ChangesService } from 'src/app/services/changes.service';


@Component({
  selector: 'app-shift-changes',
  templateUrl: './shift-changes.component.html',
  styleUrls: ['./shift-changes.component.css']
})
export class ShiftChangesComponent implements OnInit {

  //esta variable se utiliza para evaluar si hay cambios pendientes de aprobar
  isEmpty: boolean = true;

  changes: any = [];

  finalChanges: any = [];

  timerSubscription!: Subscription;

  constructor(private changesService: ChangesService) {

    this.changesService.getChanges()
      .subscribe((changes: any) => {

        changes.length === 0 ? this.isEmpty = true : this.isEmpty = false;

        for (let change of changes) {

          //esta variable será utilizada para indicar en que posición se encuentra el turno a cambiar
          let i = change.shiftApplicant.dates.indexOf(change.changeDate);

          this.finalChanges.push({
            applicantEmployee: change.applicantEmployee,
            affectedEmployee: change.affectedEmployee,
            changeDate: change.changeDate,
            applicantShift: change.shiftApplicant.shifts[i],
            affectedShift: change.shiftAffected.shifts[i]
          })
        }
      });
  }

  ngOnInit(): void { }




}
