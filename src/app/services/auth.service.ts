import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthResponse } from '../models/authResponse.interface';
import { Employees } from '../models/employees.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.baseURL;
  private _employee!: Employees;

  get employee() {
    return { ...this._employee };
  }

  constructor(private http: HttpClient) { }


  //esta función hace una petición post al back, con el email y el password y devuelve el "ok" o error
  login(email: string, password: string) {

    const url = `${this.baseURL}/auth`;

    return this.http.post<AuthResponse>(url, { email, password })//esta petición devuelve un observable con "ok", "uid", "name" Y "token"
      .pipe(
        tap(resp => {

          if (resp.ok) {
            //almacenamos el token en el local storage
            localStorage.setItem('token', resp.token!)

            this._employee = {
              name: resp.name!,
              _id: resp.uid!
            }
          }
        }),
        map(resp => resp.ok),//mutamos la respuesta para mostrar solo el "ok"
        catchError(err => of(err.error.msg))
      )
  }



  //esta función hace una petición GET para validar nuestro token
  validateToken(): Observable<boolean> {
    const url = `${this.baseURL}/auth/renew`;

    //
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || ''); //en caso de no existir token devuelve un ''


    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          return resp.ok;
        }),
        catchError(err => of(false))
      )
  }


  logout() {
    localStorage.clear();
  }
}
