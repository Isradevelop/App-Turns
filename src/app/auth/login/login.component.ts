import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
    private authService: AuthService) {

    this.myForm = new FormGroup({
      email: new FormControl,
      password: new FormControl
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password)// authService.login() return  ok: boolean. true in case of finding an employee with that email and pass
      .subscribe(ok => {

        //Modal with success or error message
        if (ok === true) {

          Swal.fire({
            icon: 'success',
            title: 'Ok!!!',
            showConfirmButton: false,
            timer: 1200
          });


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
