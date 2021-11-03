import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  constructor() { }

  get allShifts() {
    const shifts = [
      ['M', '8:00 - 16:00'],
      ['M-9', '9:00 - 17:00'],
      ['P9/19', '8:30-12:00 / 19:30-23:30'],
      ['P-1', '9:00-15:00 / 20:00-22:00'],
      ['P-2', '9:00-15:00 / 21:00-23:00']
    ]
    return shifts;
  }
}
