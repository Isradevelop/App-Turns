import { Component, OnInit } from '@angular/core';

import { EmployeesService } from 'src/app/services/employees.service';
import { Employees } from '../../models/employees.interface';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  employees: any = [];

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {

    this.employeesService.getEmployees()
      .subscribe(data => this.employees = data)


  }



}
