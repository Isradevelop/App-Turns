import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { ChangesService } from 'src/app/services/changes.service';
import { Schedule } from '../../models/schedule.interface';



@Component({
  selector: 'app-pending-changes',
  templateUrl: './pending-changes.component.html',
  styleUrls: ['./pending-changes.component.css']
})
export class PendingChangesComponent implements OnInit {
  //data necessary for the template and to modify the calendars
  changes: any = [];

  isEmptyChanges: boolean = true;

  constructor(private changeService: ChangesService,
    private authService: AuthService) {

    //check pending changes
    this.changeService.getChanges("pending")
      .subscribe((changes: any) => {

        //check logged user
        this.authService.userToken()
          .then((employee: any) => {

            for (let change of changes) {

              if (change.affectedEmployee === employee.name) {

                this.isEmptyChanges = false;

                //This variable will be used to indicate in which position the turn to change is located.
                let shiftPosition = change.shiftApplicant.dates.indexOf(change.changeDate);

                this.changes.push({
                  id: change._id,
                  applicantEmployeeName: change.applicantEmployee,
                  affectedEmployeeName: change.affectedEmployee,
                  changeDate: change.changeDate,
                  applicantShift: change.shiftApplicant.shifts[shiftPosition],
                  affectedShift: change.shiftAffected.shifts[shiftPosition],
                  applicantSchedule: change.shiftApplicant,
                  affectedSchedule: change.shiftAffected,
                  index: shiftPosition
                })
              }

            }
          });


      });
  }

  ngOnInit(): void {
  }


  //aceptar cambio
  acceptChange(id: any, applicantSchedule: Schedule, affectedSchedule: Schedule, i: number) {

    //change status a accepted and makes the shift change
    this.changeService.updateChange(id, "accepted", applicantSchedule, affectedSchedule, i)
      .subscribe();

    Swal.fire({
      icon: "success",
      title: `Cambio aceptado!!
            En cuanto un responsable lo autorice,
            el cambio se hará efectivo`,
      timer: 2000
    });

  }

  //reject change
  declineChange(id: any) {
    this.changeService.updateChange(id, "rejected")
      .subscribe();

    Swal.fire({
      icon: "error",
      title: 'Cambio rechazado!!',
      timer: 2000
    });

  }
}
