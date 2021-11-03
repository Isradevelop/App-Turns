import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {



  constructor() { }

  get names() {

    const employeesnames: string[] = ['Isra', 'Dani', 'Fina', 'Patri', 'Borja'];

    return employeesnames;
  }


}
