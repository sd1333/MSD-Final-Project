import { Component, OnInit, Inject } from '@angular/core';
import { SuperuserService } from '../services/superuser.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-alltransactions',
  template: `
  <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>


  <div class="producttablediv">
    <div class="producttable">
      <table>
      <thead>
          <tr>
              <th>Order ID#</th>
              <th>Merchant Information</th>
              <th>Customer Information</th>
              <th>Status</th>
              <th>Action</th>
           
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of orders">
              <td>{{ item._id}}</td>
              <td>
                  {{ item.farmer.firstName + ' ' + item.farmer.lastName}} <br>
                  {{item.farmer.email}} <br>
                  Rating: {{item.farmer.rating}}
              </td>
              <td>
                  {{ item.customer.firstName + ' ' + item.customer.lastName}} <br>
                  {{item.customer.email}}
              </td>
              <td>
                  {{ item.status}} <br>
              </td>
              <td>
                  <button [routerLink]="['', 'transactiondetails']" [state]= "{id: item._id}" >View Items</button>
              </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>



  
  `,
  styleUrls: ['./alltransactions.component.css']
})
export class AlltransactionsComponent implements OnInit {

  token: string
  orders

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

    this.onGetTransactions()

  }


  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    this.router.navigate([""])
  }

  onGetTransactions() {
    this.superuserservice.getTransactions()
      .subscribe((response) => {
        console.log('from Transactions response: ', response)
        this.orders = response
      })
  }

}
