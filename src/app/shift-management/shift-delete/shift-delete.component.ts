import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ShiftsService } from '../../services/shifts.service';

@Component({
  selector: 'app-shift-delete',
  templateUrl: './shift-delete.component.html',
  styleUrls: ['./shift-delete.component.css']
})
export class ShiftDeleteComponent implements OnInit, OnDestroy {

  shiftsEnabled: any;

  timerSubscription!: Subscription;

  constructor(private ShiftsService: ShiftsService,
    private router: Router) { }

  ngOnInit(): void {
    this.timerSubscription = this.ShiftsService.allShifts()
      .subscribe(data => {
        this.shiftsEnabled = data;
      });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  deleteShift(id: any) {
    this.ShiftsService.deleteShift(id)
      .subscribe(resp => {

        if (resp.ok === true) {
          Swal.fire({
            icon: 'success',
            title: 'Turno eliminado correctamente',
            timer: 2000
          });

          this.router.navigateByUrl('/shifts/typesShifts')
        } else {
          Swal.fire({
            icon: 'error',
            title: resp.msg,
            timer: 2000
          });
        }
      });
  }
}
