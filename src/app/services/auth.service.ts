import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';

import { Employees } from '../models/employees.interface';
import { Token } from '../models/token.interface';
import { EmployeesService } from './employees.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseURL;
  private _employee!: Employees;

  //this variable will be evaluated when the navbar loads
  isBoss$ = new EventEmitter<boolean>();

  //this variable defines the username in the header of the app
  userName = new EventEmitter<string>();

  get employee() {
    return { ...this._employee };
  }

  constructor(private http: HttpClient,
    private employeeService: EmployeesService,
    private router: Router) { }


  //this function makes a POST request to the back, with email and password, and return "ok" or error 
  login(email: string, password: string) {

    const url = `${this.baseURL}/auth`;

    return this.http.post<any>(url, { email, password })//this request returns a observable with "ok", "uid", "name" Y "token"
      .pipe(
        tap(resp => {

          if (resp.ok) {
            //we store the token in the local storage
            localStorage.setItem('token', resp.token!)

            this._employee = {
              name: resp.name!,
              _id: resp.uid!
            }

            this.isBoss$.emit(resp.isABoss);
            this.userName.emit(resp.name);
            this.router.navigateByUrl('/');
          }
        }),
        map(resp => resp.ok),//we mutate the answer to show only the "ok"
        catchError(err => of(err.error.msg))
      )
  }



  //this function makes a GET request to validate our token. Returns boolean observable
  validateToken(): Observable<boolean> {
    const url = `${this.baseURL}/auth/renew`;

    //
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || ''); //in case there is no token, returns ''


    return this.http.get<any>(url, { headers })
      .pipe(
        map(resp => {
          this.isBoss$.emit(resp.isABoss);
          this.userName.emit(resp.name);
          return resp.ok;
        }),
        catchError(err => of(false))
      )
  }


  logout() {
    localStorage.clear();
  }


  //this method verifies that the authenticated user exists in the DB and returns it
  userToken() {

    let employeeListService: any;

    return new Promise((resolve, reject) => {

      this.employeeService.getEmployees()
        .subscribe(employeeList => {

          employeeListService = employeeList;

          if (employeeListService) {
            const token: Token = jwt_decode(localStorage.getItem('token')!);
            const employee = employeeListService.find((employee: any) => employee.name == token.name);

            (employee)
              ? resolve(employee)
              : reject('No existe token para el usuario')
          }
        });

    })

  }
}
