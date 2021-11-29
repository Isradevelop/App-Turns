import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from '../../models/token.interface';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // esta variable carga la navbar dependiendo del rol de usuario
  isABoss: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    this.authService.isBoss$.subscribe(resp => {
      this.isABoss = resp;
    });

  }

}
