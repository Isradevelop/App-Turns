import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Token } from '../../models/token.interface';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isABoss: boolean = false;

  constructor() {




  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {

      const myToken: Token = jwt_decode(token);

      console.log(myToken);

      this.isABoss = myToken.isABoss;
    }
  }

}
