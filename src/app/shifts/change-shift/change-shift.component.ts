import { Component, OnInit } from '@angular/core';

import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.css']
})
export class ChangeShiftComponent implements OnInit {

  employees: any = [];
  employeesNames: string[] = [];

  constructor(private EmployeesService: EmployeesService) { }

  ngOnInit(): void {

    this.EmployeesService.getEmployees()
      .subscribe(data => { this.employees = data; this.getNames(); })

  }





  getNames(): void {

    let employeesNames: string[] = [];

    for (let i = 0; i < this.employees.length; i++) {

      employeesNames.push(this.employees[i].name)
    }

    this.employeesNames = employeesNames;
  }

}
