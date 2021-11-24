import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthResponse } from '../models/authResponse.interface';
import { Employees } from '../models/employees.interface';
import { environment } from '../../environments/environment.prod';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employees: any[] = [];
  private baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) {

  }

  getEmployees() {
    return this.http.get<Employees[]>(`${this.baseUrl}/employee`);
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

  //creación de empleados
  createEmployee(name: string, password: string, email: string, isABoss: boolean) {

    const employeeCreated: Employees = { name, password, email, isABoss };

    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/new`, employeeCreated)
      .pipe(
        catchError(err => of(err))
      )

  }


  //borrado de empleados
  deleteEmployee(name: string) {
    return this.http.delete<String>(`${this.baseUrl}/auth/${name}`)
  }


  //cambio de contraseña
  updatePassword(name: string, password: string) {

    return this.http.put<AuthResponse>(`${this.baseUrl}/auth`, { name, password });
  }


}
