import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Schedule } from 'src/app/models/schedule.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChangesService } from 'src/app/services/changes.service';


@Component({
  selector: 'app-shift-changes',
  templateUrl: './shift-changes.component.html',
  styleUrls: ['./shift-changes.component.css']
})
export class ShiftChangesComponent implements OnInit {

  //this variable is used to evaluate if there are changes pending approval
  isEmptyChanges: boolean = true;

  changes: any = [];

  constructor(private changesService: ChangesService,
    private authService: AuthService) {

    //check pending changes 
    this.changesService.getChanges("accepted")
      .subscribe((changes: any) => {

        //check logged user
        this.authService.userToken()
          .then((employee: any) => {

            for (let change of changes) {

              if (change.affectedEmployee === employee.name) {

                this.isEmptyChanges = false;

                //This variable will be used to indicate in which position the turn to change is located.
                let turnPosition = change.shiftApplicant.dates.indexOf(change.changeDate);

                for (let change of changes) {


                  this.changes.push({
                    id: change._id,
                    applicantEmployeeName: change.applicantEmployee,
                    affectedEmployeeName: change.affectedEmployee,
                    changeDate: change.changeDate,
                    applicantShift: change.shiftApplicant.shifts[turnPosition],
                    affectedShift: change.shiftAffected.shifts[turnPosition],
                    applicantSchedule: change.shiftApplicant,
                    affectedSchedule: change.shiftAffected,
                    index: turnPosition
                  })
                }

              };
            }
          }
          )
      }
      )
  }


  ngOnInit(): void { }


  acceptChange(id: any, applicantSchedule: Schedule, affectedSchedule: Schedule, i: number) {
    this.changesService.updateChange(id, "approved", applicantSchedule, affectedSchedule, i)
      .subscribe();

    Swal.fire({
      icon: "success",
      title: 'Cambio aceptado!!',
      timer: 2000
    });

  }


  declineChange(id: any) {
    this.changesService.updateChange(id, "rejected")
      .subscribe();

    Swal.fire({
      icon: "error",
      title: 'Cambio rechazado!!',
      timer: 2000
    });

  }

}
