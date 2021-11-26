import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Schedule } from 'src/app/models/schedule.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ChangesService } from 'src/app/services/changes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-shift-changes',
  templateUrl: './shift-changes.component.html',
  styleUrls: ['./shift-changes.component.css']
})
export class ShiftChangesComponent implements OnInit {

  //esta variable se utiliza para evaluar si hay cambios pendientes de aprobar
  isEmptyChanges: boolean = true;

  changes: any = [];

  constructor(private changesService: ChangesService,
    private router: Router,
    private authService: AuthService) {

    //consulta cambios pendientes  
    this.changesService.getChanges("accepted")
      .subscribe((changes: any) => {

        //consulta usuario logeado
        this.authService.userToken()
          .then((employee: any) => {

            for (let change of changes) {

              if (change.affectedEmployee === employee.name) {

                this.isEmptyChanges = false;

                //esta variable será utilizada para indicar en que posición se encuentra el turno a cambiar
                let i = change.shiftApplicant.dates.indexOf(change.changeDate);

                for (let change of changes) {


                  this.changes.push({
                    id: change._id,
                    applicantEmployeeName: change.applicantEmployee,
                    affectedEmployeeName: change.affectedEmployee,
                    changeDate: change.changeDate,
                    applicantShift: change.shiftApplicant.shifts[i],
                    affectedShift: change.shiftAffected.shifts[i],
                    applicantSchedule: change.shiftApplicant,
                    affectedSchedule: change.shiftAffected,
                    index: i
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

    this.router.navigateByUrl('/')
  }


  declineChange(id: any) {
    this.changesService.updateChange(id, "rejected")
      .subscribe();

    Swal.fire({
      icon: "error",
      title: 'Cambio rechazado!!',
      timer: 2000
    });

    this.router.navigateByUrl('/')
  }

}
