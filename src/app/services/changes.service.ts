import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Change } from '../models/change.interface';
import { environment } from '../../environments/environment.prod';
import { Schedule } from '../models/schedule.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {


  baseUrl = environment.baseURL;
  changesCopy: any = [];

  constructor(private http: HttpClient) { }

  //consulta todos los cambios
  getChanges() {
    return this.http.get(`${this.baseUrl}/change`);
  }

  //crea un nuevo cambio
  createChange(
    applicantEmployee: string,
    affectedEmployee: string,
    shiftApplicant: Schedule,
    shiftAffected: Schedule,
    changeDate: string,
    status: string
  ) {


    const changeCreated: Change = { applicantEmployee, affectedEmployee, shiftApplicant, shiftAffected, changeDate, status };

    return this.http.post(`${this.baseUrl}/change`, changeCreated)
      .pipe(
        catchError(err => of(err))
      );

  }


}
