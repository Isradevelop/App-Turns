import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftsRoutingModule } from './shifts-routing.module';
import { AllShiftsComponent } from './all-shifts/all-shifts.component';
import { MyShiftComponent } from './my-shift/my-shift.component';
import { ChangeShiftComponent } from './change-shift/change-shift.component';
import { TypesShiftComponent } from './types-shift/types-shift.component';
import { AllMyShiftsComponent } from './all-my-shifts/all-my-shifts.component';


@NgModule({
  declarations: [
    AllShiftsComponent,
    MyShiftComponent,
    ChangeShiftComponent,
    TypesShiftComponent,
    AllMyShiftsComponent
  ],
  imports: [
    CommonModule,
    ShiftsRoutingModule
  ]
})
export class ShiftsModule { }
