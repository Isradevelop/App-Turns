import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'shifts',
    loadChildren: () => import('./shifts/shifts.module').then(m => m.ShiftsModule)
  },
  {
    path: 'shiftManagement',
    loadChildren: () => import('./shift-management/shift-management.module').then(m => m.ShiftManagementModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: '**',
    redirectTo: 'shifts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
