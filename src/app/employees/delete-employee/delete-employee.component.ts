import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EmployeesService } from 'src/app/services/employees.service';
import { Employees } from '../../models/employees.interface';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit, OnDestroy {

  employees: any = [];

  timerSubscription!: Subscription;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {

    this.timerSubscription = this.employeesService.getEmployees()
      .subscribe(data => this.employees = data)

  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}
