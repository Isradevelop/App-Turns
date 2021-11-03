import { Injectable } from '@angular/core';

import { Employees } from '../models/employees.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employees: Employees[] = [
    {
      'name': 'Dani',
      'password': '1234'
    },
    {
      'name': 'Isra',
      'password': '12345'
    },
    {
      'name': 'Riki',
      'password': '123456'
    },
    {
      'name': 'Fina',
      'password': '1234567'
    }
  ];

  constructor() { }



  get names(): string[] {

    let employeesNames: string[] = [];

    for (let i = 0; i < this.employees.length; i++) {

      employeesNames.push(this.employees[i].name)
    }

    return employeesNames;
  }



  password(name: string): string {

    let password = '';

    for (let i = 0; i < this.employees.length; i++) {

      if (this.employees[i].name == name) {

        password = this.employees[i].password;
      }
    }

    return password;
  }


}
