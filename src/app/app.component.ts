import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AppTurns';
  isToken: boolean = false;
  userName: string = 'User';

  constructor(private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {

    this.authService.userName.subscribe(resp => this.userName = resp);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
