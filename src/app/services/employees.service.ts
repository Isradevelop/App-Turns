import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment.prod';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthResponse } from '../models/authResponse.interface';
import { Employees } from '../models/employees.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employees: any[] = [];
  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient,
    private router: Router) {

  }

  getEmployees() {
    return this.http.get<Employees[]>(`${this.baseUrl}/employee`)
      .pipe(
        catchError(err => of(err))
      );
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

  //employee creation
  createEmployee(name: string, password: string, email: string, isABoss: boolean) {

    const employeeCreated: Employees = { name, password, email, isABoss };

    return this.http.post<AuthResponse>(`${this.baseUrl}/employee/new`, employeeCreated)
      .pipe(
        tap(resp => this.router.navigateByUrl('/')),
        catchError(err => of(err))
      )

  }


  //deletion of employees
  deleteEmployee(name: string) {
    return this.http.delete<String>(`${this.baseUrl}/employee/${name}`)
      .pipe(
        tap(resp => this.router.navigateByUrl('/')),
        catchError(err => of(err))
      )
  }


  //change of password
  updatePassword(name: string, password: string) {

    return this.http.put<AuthResponse>(`${this.baseUrl}/employee`, { name, password })
      .pipe(
        catchError(err => of(err))
      );
  }


}
