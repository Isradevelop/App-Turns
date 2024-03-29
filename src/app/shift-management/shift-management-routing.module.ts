import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ShiftChangesComponent } from './shift-changes/shift-changes.component';
import { ShiftCreateComponent } from './shift-create/shift-create.component';
import { ShiftDeleteComponent } from './shift-delete/shift-delete.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'shiftChanges', component: ShiftChangesComponent },
      { path: 'shiftCreate', component: ShiftCreateComponent },
      { path: 'shiftDelete', component: ShiftDeleteComponent },
      { path: 'scheduleCreate', component: ScheduleCreateComponent },
      { path: '**', redirectTo: 'shiftChanges' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftManagementRoutingModule { }
