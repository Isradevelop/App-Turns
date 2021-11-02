import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllMyShiftsComponent } from './all-my-shifts/all-my-shifts.component';
import { AllShiftsComponent } from './all-shifts/all-shifts.component';
import { ChangeShiftComponent } from './change-shift/change-shift.component';
import { MyShiftComponent } from './my-shift/my-shift.component';
import { TypesShiftComponent } from './types-shift/types-shift.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'allShifts', component: AllShiftsComponent },
      { path: 'myShift', component: MyShiftComponent },
      { path: 'changeShift', component: ChangeShiftComponent },
      { path: 'typesShifts', component: TypesShiftComponent },
      { path: 'allMyShifts', component: AllMyShiftsComponent },
      { path: '**', redirectTo: 'allShifts' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftsRoutingModule { }
