import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'createEmployee', component: CreateEmployeeComponent },
      { path: 'deleteEmployee', component: DeleteEmployeeComponent },
      { path: '**', redirectTo: 'createEmployee' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
