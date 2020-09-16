import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FarmerService } from '../services/farmer.service';


interface IProductDetails {
  productName: string,
  price: number,
  qty: number
}

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

interface IProduct {
  _id: string,
  product: IProductDetails,
  farmer: IFarmerDetails
}

interface IOrder {
  _id: string,
  status: string,
  customer: ICustomerDetails,
  farmer: IFarmerDetails,
  products: Array<IProduct>,

}


@Component({
  selector: 'app-orders',
  template: `
    
    <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>


  <div class="statusbuttons">
      
        View Orders by Status: 
        <button class="statusbutton" (click)="onViewByStatus('pending')" >Pending</button>
        <button class="statusbutton"  (click)="onViewByStatus('ready')">Ready</button>
        <button class="statusbutton" (click)="onViewByStatus('complete')">Complete</button>
      
  <div>


    <div class="producttablediv">
  <div class="producttable">
    <table>
    <thead>
         <tr>
            <th>Order Id</th>
            <th>Order Status</th>
            <th>Customer Name</th>
            
            
            <th>Action</th>
         </tr>
      </thead>
      <tbody>
         <tr *ngFor="let item of orders">
            <td>{{ item._id}}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.customer.firstName + ' ' + item.customer.lastName}}</td>

            <td>
              <a class="edit" [routerLink]="['','editorder']" [state]="{id: item._id}"> Edit </a>
            </td>

         </tr>
      </tbody>
    </table>
  </div>
  </div>


  `,
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  token: string
  orders

  constructor(
    @Inject('AppStore') private appStore,
    private router: Router,
    private farmerService: FarmerService,

  ) { }

  ngOnInit(): void {



    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }

    console.log('orders ')

    this.farmerService.getOrders()
      .subscribe((response: IOrder) => {
        this.orders = response
        // console.log('RESPONSE: ', response)
        // console.log("this.orders[0]._id: ", this.orders[0]._id)

      })
  }

  onViewByStatus(status) {
    this.farmerService.viewOrderByStatus(status)
      .subscribe((response) => {
        console.log(response)
        this.orders = response
      })
  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    this.router.navigate([""])

  }

}
