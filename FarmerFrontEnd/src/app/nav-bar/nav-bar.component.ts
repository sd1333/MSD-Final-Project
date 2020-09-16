import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import * as jwt_decode from 'jwt-decode'

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

interface ITokenObject {
  token: string,
  userInfo: IUser
}


@Component({
  selector: 'app-nav-bar',
  template: `
  
<div *ngIf="farmerInfo.farmer.role == 'farmer'; else administrator">

  <div class="topnav">
    <a class="active" [routerLink]="['']">Simply Fresh.</a>

    <a [routerLink]="['','orders']">My Orders</a>
    <a [routerLink]="['','products']">My Products</a>
  

    <div class="container">
      <p class="user">Hi {{farmerInfo.farmer.firstName}}!</p>
      <button class="logout" (click)=onLogout()>Logout</button>
    </div>

  </div>

</div>

<ng-template #administrator>

<div class="admintopnav">
    <a class="active" [routerLink]="['']">Simply Fresh.</a>



    <a [routerLink]="['','allaccounts']">View All Accounts</a>
    <a [routerLink]="['','alltransactions']">View All Transactions</a>
    <a [routerLink]="['','allrequests']">View All Requests</a>
  

    <div class="container">
      <p class="user">Hi {{farmerInfo.farmer.firstName}}!</p>
      <button class="logout" (click)=onLogout()>Logout</button>
    </div>

  </div>

</ng-template>




  `,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() navToken
  farmerInfo;

  @Output() logoutEvent = new EventEmitter()

  constructor(
    @Inject('AppStore') private appStore
  ) { }

  ngOnInit(): void {
    this.farmerInfo = jwt_decode(this.navToken)
  }


  onLogout() {
    this.logoutEvent.emit()
  }

}

// <div style="padding-left:16px">
//   <button [routerLink]="['test']" >Test</button>
// </div>