import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';


@NgModule({
  declarations: [
    CreateEmployeeComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
