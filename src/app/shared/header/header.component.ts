import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  title = 'AppTurns';
  userName: string = 'User';

  constructor(private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.authService.userName.subscribe(resp => this.userName = resp);
  }


  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
