import { Component, OnInit, Inject } from '@angular/core';
import { FarmerService } from '../services/farmer.service';
import { Router } from '@angular/router';
import { SuperuserService } from '../services/superuser.service';

interface IFarmerDetails {
  role: string,
  rating: number,
  _id: string,
  firstName: string,
  lastName: string,
  email: string
}

interface ICustomerDetails {
  email: string,
  firstName: string,
  lastName: string,
  _id: string
}

interface IProductDetails {
  productId: string,
  productName: string,
  price: number,
  qty: number
}

interface IOrder {
  _id: string,
  status: string,
  customer: ICustomerDetails,
  farmer: IFarmerDetails,
  products: Array<IProductDetails>,
}




@Component({
  selector: 'app-transactiondetails',
  template: `
        <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>

        <p>
    Order ID: {{this.order._id}}<br>
    Status: {{this.order.status}}<br><br>
    Customer Name: {{this.order.customer.firstName}} {{this.order.customer.lastName}} <br>
    Customer E-mail: {{this.order.customer.email}}
    </p>

    
    <div class="ordertablediv">
  <div class="ordertable">
    <table>
    <thead>
         <tr>
            <th>Product Purchased</th>
            <th>Price</th>
         </tr>
      </thead>
      <tbody>
         <tr *ngFor="let item of this.order.products">
            <td>{{ item.productName }}</td>
            <td>{{ item.price }}</td>
         
         </tr>
      </tbody>
    </table>
  </div>
  </div>

  <p class="ordertotal">Order total: $ {{priceTotal}}</p>
  
  `,
  styleUrls: ['./transactiondetails.component.css']
})
export class TransactiondetailsComponent implements OnInit {
  token: string
  orderId: string
  order: IOrder
  priceTotal: number

  constructor(
    @Inject('AppStore') private appStore,
    private superuserservice: SuperuserService,
    private router: Router
  ) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.orderId = this.router.getCurrentNavigation().extras.state.id
      localStorage.setItem('orderId', this.orderId)
    } else {
      this.orderId = localStorage.getItem('orderId')
    }



  }

  ngOnInit(): void {

    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }

    this.superuserservice.getOrder(this.orderId)
      .subscribe((response: IOrder) => {
        console.log("getOrder Response: ", response)
        this.order = response
        console.log("this.order.products: ", this.order.products)
        this.priceTotal = this.calcTotal()
        console.log("this.priceTotal: ", this.priceTotal)

      })

  }

  calcTotal() {
    let total: number = 0
    for (let item of this.order.products) {
      total = total + item.price
    }
    return total
  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    localStorage.removeItem('orderId')
    this.router.navigate([""])
  }


}
