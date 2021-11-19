import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;


  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {

    this.myForm = new FormGroup({
      email: new FormControl,
      password: new FormControl
    })
  }

  ngOnInit(): void {
  }

  login() {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)// authService.login() retorna  ok: boolean. true en caso de encontrar empleado con ese email y pass
      .subscribe(ok => {

        //Modal con mensaje success o error
        if (ok === true) {

          Swal.fire({
            icon: 'success',
            title: 'Ok!!!',
            showConfirmButton: false,
            timer: 1200
          });
          this.router.navigateByUrl('/');

        } else {

          Swal.fire({
            icon: 'error',
            title: 'Error!!',
            text: ok,
          })
        }

      })

  }

}
