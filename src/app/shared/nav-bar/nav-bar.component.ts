import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // this variable loads the navbar depending on the user role
  isABoss: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    this.authService.isBoss$.subscribe(resp => {
      this.isABoss = resp;
    });

  }

}
