import { Component, OnInit } from '@angular/core';

import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {



  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
  }

  empleados: string[] = this.employeesService.names;

}
