import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { NightHoursComponent } from './night-hours/night-hours.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'createEmployee', component: CreateEmployeeComponent },
      { path: 'deleteEmployee', component: DeleteEmployeeComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: 'nightHours', component: NightHoursComponent },
      { path: '**', redirectTo: 'createEmployee' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
