import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesRoutingModule } from './employees-routing.module';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NightHoursComponent } from './night-hours/night-hours.component';


@NgModule({
  declarations: [
    CreateEmployeeComponent,
    DeleteEmployeeComponent,
    ChangePasswordComponent,
    NightHoursComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
  ]
})
export class EmployeesModule { }
