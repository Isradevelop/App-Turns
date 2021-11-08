import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Change } from '../models/change.interface';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {


  changesCopy: any = [];

  constructor(private http: HttpClient) { }

  getChanges() {

    return this.http.get('../mock/changes.json');

  }


}
