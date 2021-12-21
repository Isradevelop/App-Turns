import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';


import { ShiftsService } from '../../services/shifts.service';
import { EmployeesService } from '../../services/employees.service';
import { ScheduleService } from '../../services/schedule.service';



@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {

  myForm: FormGroup;
  shiftsNames: string[] = [];
  employeeNames: string[] = [];

  constructor(private shiftService: ShiftsService,
    private employeeService: EmployeesService,
    private scheduleService: ScheduleService,
    private fb: FormBuilder) {



    this.myForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      employeeName: ['', Validators.required],
      mondayShift: ['', Validators.required],
      tuesdayShift: ['', Validators.required],
      wednesdayShift: ['', Validators.required],
      thursdayShift: ['', Validators.required],
      fridayShift: ['', Validators.required],
      saturdayShift: ['', Validators.required],
      sundayShift: ['', Validators.required],
    });

  }

  ngOnInit(): void {

    //select of employee name
    this.employeeService.getEmployeesNames()
      .subscribe((employeeNames: string[]) => {
        this.employeeNames = employeeNames;
      });

    //selects of shifts
    this.shiftService.allShiftsNames()
      .subscribe((allShiftsNames: string[]) => {
        this.shiftsNames = allShiftsNames;
      });
  }

  onSubmit() {

    const employeeName: string = this.myForm.value.employeeName;
    const from: string = this.myForm.value.from;
    const to: string = this.myForm.value.to;
    const mondayShift: string = this.myForm.value.mondayShift;
    const tuesdayShift: string = this.myForm.value.tuesdayShift;
    const wednesdayShift: string = this.myForm.value.wednesdayShift;
    const thursdayShift: string = this.myForm.value.thursdayShift;
    const fridayShift: string = this.myForm.value.fridayShift;
    const saturdayShift: string = this.myForm.value.saturdayShift;
    const sundayShift: string = this.myForm.value.sundayShift;

    const fromList = from.split('-');

    const year = fromList[0];
    const month = fromList[1];

    const shifts: string[] = [mondayShift, tuesdayShift, wednesdayShift, thursdayShift, fridayShift, saturdayShift, sundayShift];

    const dates = this.checkDate(from, to);

    this.scheduleService.createSchedule(employeeName, dates, shifts, year, month)
      .subscribe(scheduleCreated => {
        if (scheduleCreated) {
          Swal.fire({
            icon: 'success',
            title: 'Calendario creado con éxito',
            timer: 2500
          })
        }
      });
  }

  //this method create the dates for the new schedule
  checkDate(from: string, to: string) {

    // format the date From and To
    let fromList: string[] = from.split('-');
    let toList: string[] = to.split('-');


    let dayFromNumeric = parseInt(fromList[2]);
    let dayToNumeric = parseInt(toList[2]);
    let monthFromNumeric = parseInt(fromList[1]);
    let monthToNumeric = parseInt(toList[1]);
    let yearFromNumeric = parseInt(fromList[0]);
    let yearToNumeric = parseInt(toList[0]);


    let array: string[] = [];
    let counter: number = 1;

    for (let i = 0; i < 7; i++) {

      //check if year and month are same in From / To
      if (dayFromNumeric < dayToNumeric && monthFromNumeric === monthToNumeric && fromList[0] === toList[0]) {

        let date = (dayFromNumeric + i) + '/' + fromList[1];
        array.push(date);
      }
      //ckeck if are distinct months and years
      else if ((monthFromNumeric > monthToNumeric && yearFromNumeric < yearToNumeric) || (monthFromNumeric < monthToNumeric && yearFromNumeric === yearToNumeric) || (dayFromNumeric < dayToNumeric && monthFromNumeric === monthToNumeric)) {

        let date: string;
        // months with 31 days
        if (fromList[1] === '01' || fromList[1] === '03' || fromList[1] === '05' || fromList[1] === '07' || fromList[1] === '08' || fromList[1] === '10' || fromList[1] === '12') {

          if (dayFromNumeric < 32) {
            date = dayFromNumeric + '/' + fromList[1];
            array.push(date);
            dayFromNumeric = dayFromNumeric + 1;
          }
          else {
            date = counter + '/' + toList[1];
            array.push(date);
            counter++;
          }

        }
        //check if the month is february
        else if (fromList[1] === '02') {
          let leap: number = parseInt(fromList[0]) / 4;
          //check if the year is leap
          if (Number.isInteger(leap)) {

            if (dayFromNumeric < 30) {
              date = dayFromNumeric + '/' + fromList[1];
              array.push(date);
              dayFromNumeric = dayFromNumeric + 1;
            }
            else {
              date = counter + '/' + toList[1];
              array.push(date);
              counter++;
            }
          }
          else {
            if (dayFromNumeric < 29) {
              date = dayFromNumeric + '/' + fromList[1];
              array.push(date);
              dayFromNumeric = dayFromNumeric + 1;
            }
            else {
              date = counter + '/' + toList[1];
              array.push(date);
              counter++;
            }
          }
        }
        //months with 30 days
        else {
          if (dayFromNumeric < 31) {
            date = dayFromNumeric + '/' + fromList[1];
            array.push(date);
            dayFromNumeric = dayFromNumeric + 1;
          }
          else {
            date = counter + '/' + toList[1];
            array.push(date);
            counter++;
          }
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'La fecha Hasta tiene que ser posterior a la fecha Desde',
          timer: 2500
        });
      }
    }
    return array;



  }

}
