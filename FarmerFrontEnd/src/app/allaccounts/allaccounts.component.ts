import { Component, OnInit, Inject } from '@angular/core';
import { SuperuserService } from '../services/superuser.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-allaccounts',
  template: `
  
  <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>

  <button type="button" class="user" (click)="onGetFarmers()" >Show Farmers</button>
  <button type="button" class="user" (click)="onGetCustomers()" >Show Customers</button>


  <div *ngIf="userCategory == 'farmers' ; else customers "> 

  <div class="producttablediv">
    <div class="producttable">
      <table>
      <thead>
          <tr>
              <th>ID#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Role</th>
              <th>Activation Status</th>
           
              
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of users">
              <td>{{ item._id}}</td>
              <td>{{ item.firstName + ' ' + item.lastName}}</td>
              <td>{{ item.email}}</td>
              <td>{{ item.rating }}</td>
              <td>{{ item.role }}</td>

              <td> 
                <button *ngIf="item.activated ; else deactivated" class="activated" (click)="onFarmerActivationToggle(item._id)"> Activated </button>
              </td>
                    <ng-template #deactivated><button class="deactivated" (click)="onFarmerActivationToggle(item._id)"> Deactivated </button></ng-template>
              <td>
              <button class="activated" [routerLink]="['', 'resetpassword']" [state]="{id: item._id}"> Reset User Password </button>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  </div>



  <ng-template #customers>

 <div class="producttablediv">
    <div class="producttable">
      <table>
      <thead>
          <tr>
              <th>ID#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Activation Status</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of users">
              <td>{{ item._id}}</td>
              <td>{{ item.firstName + ' ' + item.lastName}}</td>
              <td>{{ item.email}}</td>

              <td> 
                <button *ngIf="item.activated ; else deactivated" class="activated" (click)="onCustomerActivationToggle(item._id)"> Activated </button>
              </td>
                    <ng-template #deactivated><button class="deactivated" (click)="onCustomerActivationToggle(item._id)"> Deactivated </button></ng-template>

              <td>
                <!-- <button class="activated" (click)="navToResetPass(item._id)"> Reset User Password </button> -->
                <button class="activated" [routerLink]="['', 'resetcustomerpassword']" [state]="{id: item._id}"> Reset User Password </button>
          
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


  </ng-template>



  `,
  styleUrls: ['./allaccounts.component.css']
})
export class AllaccountsComponent implements OnInit {

  token: string
  users
  userCategory: string


  constructor(
    @Inject('AppStore') private appStore,
    private superuserservice: SuperuserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }

    this.onGetFarmers()

  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    this.router.navigate([""])
  }

  onGetFarmers() {
    this.superuserservice.getFarmers()
      .subscribe((response) => {
        console.log('onGetFarmers response: ', response)
        this.userCategory = 'farmers'
        this.users = response


      })
  }

  onGetCustomers() {
    this.superuserservice.getCustomers()
      .subscribe((response) => {
        console.log('onGetCustomers response: ', response)
        this.userCategory = 'customers'
        this.users = response
      })
  }

  onFarmerActivationToggle(id) {
    this.superuserservice.farmerActivationToggle(id)
      .subscribe((response) => {
        console.log('onFarmerActivationToggle response: ', response)
        this.onGetFarmers()
      })
  }

  onCustomerActivationToggle(id) {
    this.superuserservice.customerActivationToggle(id)
      .subscribe((response) => {
        console.log('onCustomerActivationToggle response: ', response)
        this.onGetCustomers()
      })
  }

  navToResetPass(id) {

  }

}
