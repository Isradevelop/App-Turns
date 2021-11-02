import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  empleados: string[] = ['Isra', 'Jesús', 'Jessi', 'Samira', 'Espe', 'Mara', 'Borja'];

  constructor() { }

  ngOnInit(): void {
  }

}
