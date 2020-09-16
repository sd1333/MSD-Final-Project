import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'

import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';

interface IResponse {
  accessToken: String
}

@Component({
  selector: 'app-adminlogin',
  template: `<body>

  <div>
    <h1>Administrator Sign In</h1>
  </div>

  <div>
  <form [formGroup]="signInForm" (ngSubmit)="onSubmit()">
  
    <div>
        <label for="email">Email </label> <br>
        <input type="text" class="form-control" id="email" formControlName="email">
    </div>
    <br>
    <div>
        <label for="password">Password </label> <br>
        <input type="text" class="form-control" id="password" formControlName="password">
    </div>
    <div class="signinbutton">
      <button type="submit">Sign in!</button>
    </div>

   
    </form>

   
  </div>


</body>
`,
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {


  signInForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    @Inject('AppStore') private appStore
  ) {
    this.signInForm = formBuilder.group({
      "email": ['', [Validators.required]],
      "password": ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {



  }
}