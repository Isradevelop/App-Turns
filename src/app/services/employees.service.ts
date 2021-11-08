import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employees } from '../models/employees.interface';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employees: any;

  constructor(private http: HttpClient) {

  }

  getEmployees() {

    return this.employees = this.http.get('mock/employees.json');

  }

  password(name: string): string {

    let password = '';

    for (let employee of this.employees) {

      if (employee.name == name) {

        password = employee.password;
      }
    }

    return password;
  }

  createEmployee(name: string, password: string): Employees {

    let employeeCreated: Employees = { name: name, password: password };

    //this.employees.push(employeeCreated);

    return employeeCreated;
  }


}
