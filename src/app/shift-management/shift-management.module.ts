import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftManagementRoutingModule } from './shift-management-routing.module';
import { ShiftChangesComponent } from './shift-changes/shift-changes.component';
import { ShiftCreateComponent } from './shift-create/shift-create.component';
import { ShiftDeleteComponent } from './shift-delete/shift-delete.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShiftChangesComponent,
    ShiftCreateComponent,
    ShiftDeleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShiftManagementRoutingModule
  ]
})
export class ShiftManagementModule { }
