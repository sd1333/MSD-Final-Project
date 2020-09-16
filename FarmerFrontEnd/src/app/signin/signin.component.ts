import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'

import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';

interface IResponse {
  accessToken: String
}


@Component({
  selector: 'app-signin',
  template: `
  
  <body>

  <div>
    <h1>Please Sign In</h1>
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
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


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
    const userFormInfo = this.signInForm.value
    console.log("userFormInfo: ", userFormInfo)

    this.authService.signIn(userFormInfo)
      .subscribe((response: IResponse) => {
        console.log('RESPONSE: ', response)

        this.appStore.dispatch({
          type: 'SETTOKEN',
          payload: response.accessToken
        })
        this.router.navigate([""])
      })

    //this.formInvalid = true do this later. 

  }

}






// <div>
// <button class="admin" (click)="navToAdminLogin()">Site Administrators, Sign In Here!</button>
// </div>

// navToAdminLogin() {
//   this.router.navigate(["adminlogin"])
// }

