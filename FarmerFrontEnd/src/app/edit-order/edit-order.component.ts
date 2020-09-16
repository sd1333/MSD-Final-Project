import { Component, OnInit, Inject } from '@angular/core';
import { FarmerService } from '../services/farmer.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

// interface IProduct {
//   _id: string,
//   product: IProductDetails,
//   farmer: IFarmerDetails
// }

interface IOrder {
  _id: string,
  status: string,
  customer: ICustomerDetails,
  farmer: IFarmerDetails,
  products: Array<IProductDetails>,
}

@Component({
  selector: 'app-edit-order',
  template: `
    <p>this is edit order</p>
    <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>
    <h1>Order Details </h1>
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
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
         </tr>
      </thead>
      <tbody>
         <tr *ngFor="let item of this.order.products">
            <td>{{ item.productName }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.qty }}</td>
         </tr>
      </tbody>
    </table>
  </div>
  </div>

  <p class="ordertotal">Order total: $ {{priceTotal}}</p>

  <div *ngIf="order.status == 'pending'; else complete">

  
    <form [formGroup]="dateForm">
      <label for="readydate">When will this order be ready? </label>
      <input type="date" id="readydate" name="readydate" formControlName="readydate">
    </form>

    <div class="ready">
      <div class="readybutton">
        <button class="ready" (click)="onReady()"> Ready </button>
      </div>
    </div>
  </div>

  <ng-template #complete>
    <div class="ready">
      <button class="complete" (click)="onComplete()"> Complete </button>
    </div>
  </ng-template>

  `,
  styleUrls: ['./edit-order.component.css']
})


export class EditOrderComponent implements OnInit {

  token: string
  orderId: string
  order: IOrder
  priceTotal: number
  dateForm: FormGroup

  constructor(
    @Inject('AppStore') private appStore,
    private formBuilder: FormBuilder,
    private farmerService: FarmerService,
    private router: Router
  ) {

    console.log("this.router.getCurrentNavigation().extras.state: ", this.router.getCurrentNavigation().extras.state)
    console.log('hello1')

    if (this.router.getCurrentNavigation().extras.state) {
      this.orderId = this.router.getCurrentNavigation().extras.state.id
      localStorage.setItem('orderId', this.orderId)
    } else {
      this.orderId = localStorage.getItem('orderId')
    }


    this.dateForm = formBuilder.group({
      "readydate": ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }

    this.farmerService.getOrder(this.orderId)
      .subscribe((response: IOrder) => {
        console.log("getOrder Response: ", response)
        this.order = response
        console.log("this.order.products: ", this.order.products)
        this.priceTotal = this.calcTotal()
        console.log("this.priceTotal: ", this.priceTotal)

      })

  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    localStorage.removeItem('orderId')
    this.router.navigate([""])
  }

  calcTotal() {
    let total: number = 0
    for (let item of this.order.products) {
      total = total + (item.price * item.qty)
    }
    return total
  }

  onReady() {
    console.log('onReady()')
    console.log("this.dateForm.value: ", this.dateForm.value)
    const readydate = this.dateForm.value.readydate

    const body = {
      status: 'ready',
      readydate: readydate
    }

    console.log('body: ', body)
    this.farmerService.updateOrderStatus(this.orderId, body)
      .subscribe((response) => {
        console.log('onReady response: ', response)
        localStorage.removeItem('orderId')
        this.router.navigate(['orders'])
      })

  }

  onComplete() {
    console.log('onComplete()')

    const body = {
      status: 'complete',
    }

    this.farmerService.updateOrderStatus(this.orderId, body)
      .subscribe((response) => {
        console.log('onReady response, should be "complete": ', response)
        localStorage.removeItem('orderId')
        this.router.navigate(['orders'])
      })
  }

}
