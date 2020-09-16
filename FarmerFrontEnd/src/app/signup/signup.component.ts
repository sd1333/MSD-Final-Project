import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'

import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  template: `

<body>

  <h1>Create an account</h1>
  
  <div>
    <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="firstName">First Name </label> <br>
        <input type="text" class="form-control" id="firstName" formControlName="firstName">  
      </div>
    <br>
    <div>
        <label for="lastName">Last Name </label> <br>
        <input type="text" class="form-control" id="lastName" formControlName="lastName">
    </div>
    <br>
    <div>
        <label for="email">Email </label> <br>
        <input type="text" class="form-control" id="email" formControlName="email">
    </div>
    <br>
    <div>
        <label for="password">Password </label> <br>
        <input type="text" class="form-control" id="password" formControlName="password">
    </div>

  <button class="createaccountbutton" type="submit">Create Account!</button>

    </form>
  </div>
</body>
  
  `,
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  signUpForm: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    @Inject('AppStore') private appStore
  ) {
    this.signUpForm = formBuilder.group({
      "firstName": ['', [Validators.required]],
      "lastName": ['', [Validators.required]],
      "email": ['', [Validators.required]],
      "password": ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    const userFormInfo = this.signUpForm.value
    console.log("userFormInfo: ", userFormInfo)

    this.authService.signUp(userFormInfo)
      .subscribe((response) => {
        console.log(response)
        this.router.navigate(["signin"])
      })

    //this.formInvalid = true do this later. 

  }

}
