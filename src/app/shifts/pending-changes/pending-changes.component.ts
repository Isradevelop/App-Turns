import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from 'src/app/services/auth.service';
import { ChangesService } from 'src/app/services/changes.service';
import { Employees } from '../../models/employees.interface';
import Swal from 'sweetalert2';
import { Schedule } from '../../models/schedule.interface';



@Component({
  selector: 'app-pending-changes',
  templateUrl: './pending-changes.component.html',
  styleUrls: ['./pending-changes.component.css']
})
export class PendingChangesComponent implements OnInit {
  //datos necesarios para el template y para modificar los calendarios
  changes: any = [];

  isEmptyChanges: boolean = true;

  constructor(private changeService: ChangesService,
    private authService: AuthService,
    private router: Router,) {

    //consulta cambios pendientes
    this.changeService.getChanges("pending")
      .subscribe((changes: any) => {

        //consulta usuario logeado
        this.authService.userToken()
          .then((employee: any) => {

            for (let change of changes) {

              if (change.affectedEmployee === employee.name) {

                this.isEmptyChanges = false;

                //esta variable será utilizada para indicar en que posición se encuentra el turno a cambiar
                let i = change.shiftApplicant.dates.indexOf(change.changeDate);

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

            }
          });


      });
  }

  ngOnInit(): void {
  }


  //aceptar cambio
  acceptChange(id: any, applicantSchedule: Schedule, affectedSchedule: Schedule, i: number) {

    //cambiar status a accepted
    this.changeService.updateChange(id, "accepted", applicantSchedule, affectedSchedule, i)
      .subscribe();

    Swal.fire({
      icon: "success",
      title: `Cambio aceptado!!
            En cuanto un responsable lo autorice,
            el cambio se hará efectivo`,
      timer: 2000
    });

    this.router.navigateByUrl('/')
  }

  //rechazar cambio
  declineChange(id: any) {
    this.changeService.updateChange(id, "rejected")
      .subscribe();

    Swal.fire({
      icon: "error",
      title: 'Cambio rechazado!!',
      timer: 2000
    });

    this.router.navigateByUrl('/')
  }
}
