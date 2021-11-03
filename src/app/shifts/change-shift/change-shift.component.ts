import { Component, OnInit } from '@angular/core';

import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-change-shift',
  templateUrl: './change-shift.component.html',
  styleUrls: ['./change-shift.component.css']
})
export class ChangeShiftComponent implements OnInit {



  constructor(private EmployeesService: EmployeesService) { }

  ngOnInit(): void {
  }

  employeesName: string[] = this.EmployeesService.names;

}
