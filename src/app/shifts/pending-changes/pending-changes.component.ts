import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

import { AuthService } from 'src/app/services/auth.service';
import { ChangesService } from 'src/app/services/changes.service';
import { Employees } from '../../models/employees.interface';
import { Change } from '../../models/change.interface';


@Component({
  selector: 'app-pending-changes',
  templateUrl: './pending-changes.component.html',
  styleUrls: ['./pending-changes.component.css']
})
export class PendingChangesComponent implements OnInit {

  changes: any = [];

  isEmptyChanges: boolean = true;

  constructor(private changeService: ChangesService,
    private authService: AuthService) {



    this.changeService.getChanges()
      .subscribe((changes: any) => {

        this.authService.userToken()
          .then((employee: any) => {

            for (let change of changes) {

              if (change.affectedEmployee === employee.name) {

                this.isEmptyChanges = false;

                //esta variable será utilizada para indicar en que posición se encuentra el turno a cambiar
                let i = change.shiftApplicant.dates.indexOf(change.changeDate);

                this.changes.push({
                  applicantEmployee: change.applicantEmployee,
                  affectedEmployee: change.affectedEmployee,
                  changeDate: change.changeDate,
                  applicantShift: change.shiftApplicant.shifts[i],
                  affectedShift: change.shiftAffected.shifts[i]
                })
              }

            }
          });


      });
  }

  ngOnInit(): void {

  }

}
