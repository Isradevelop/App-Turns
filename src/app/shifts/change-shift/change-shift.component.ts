import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.css']
})
export class ChangeShiftComponent implements OnInit, OnDestroy {

  employees: any = [];
  employeesNames: string[] = [];
  timerSubscription!: Subscription;

  constructor(private EmployeesService: EmployeesService) { }

  ngOnInit(): void {

    this.EmployeesService.getEmployees()
      .subscribe(data => { this.employees = data; this.getNames(); })

  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  getNames(): void {

    let employeesNames: string[] = [];

    for (let employee of this.employees) {

      employeesNames.push(employee.name)
    }

    this.employeesNames = employeesNames;
  }

}
