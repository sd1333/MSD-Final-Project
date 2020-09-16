
import { Component, OnInit, Inject } from '@angular/core';
import * as jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';

interface IFarmerDetails {
  role: string,
  rating: number,
  _id: string,
  firstName: string,
  lastName: string,
  email: string
}

interface IUser {
  exp: number,
  farmer: IFarmerDetails
  iat: number
}

// interface ITokenObject {
//   token: string,
//   userInfo: IUser
// }

// SHAWN READ THIS WHEN YOU WAKE UP. You start with the first bullet point for Super user requirement. You have to change what the links do in the NavBar. Use NgIf. 


@Component({
  selector: 'app-home',
  template: `

    <div *ngIf="token; else signin">

    <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>

          <div *ngIf="role == 'farmer'; else administrator" >
            <p class="welcome">Welcome! You're logged in. Feel free to view your orders or product inventory.</p>
          </div>

          <ng-template #administrator>
          <p class="welcome">Welcome to the Administrator Dashboard</p>
          </ng-template>

    </div>
    <ng-template #signin>
      <body>
    <div class="center">
        <p class="title">Simply Fresh<p>
        <p class="caption">Hi there, Farmer. Selling your goods just got easier. <p>
    </div>
    <div class="buttoncenter">
        <button class="sign-up" [routerLink]="['signup']"> Sign Up!</button>
        <button class="sign-up" [routerLink]="['signin']"> Sign In!</button>
    </div>
</body>
    </ng-template>

  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string
  role: string

  constructor(
    @Inject('AppStore') private appStore,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
      console.log('this.appStore.getState().token: ', this.appStore.getState().token)
      this.roleAssign()
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
      this.roleAssign()

    }

    // this might be your logout issue here. Fix it.

    // const user: IUser = jwt_decode(this.token)
    // console.log('user: ', user.farmer)
    // this.role = user.farmer.role
    // console.log('this.role: ', this.role)

  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    this.router.navigate([''])
  }

  roleAssign() {
    const user: IUser = jwt_decode(this.token)
    console.log('user: ', user.farmer)
    this.role = user.farmer.role
    console.log('this.role: ', this.role)

  }

}
