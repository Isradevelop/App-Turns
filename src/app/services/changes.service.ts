import { Injectable } from '@angular/core';
import { Change } from '../models/change.interface';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {

  constructor() { }

  get changes(): Change[] {
    let allChanges: Change[] = [
      {
        "applicantEmployee": "Vitaly",
        "affectedEmployee": "Samira",
        "changeDate": "09/11/2021",
        "shiftApplicant": "M-9",
        "shiftAffected": "P-1"
      },
      {
        "applicantEmployee": "Isra",
        "affectedEmployee": "Dani",
        "changeDate": "05/11/2021",
        "shiftApplicant": "P-1",
        "shiftAffected": "P-2"
      }
    ];
    return allChanges;
  }
}
