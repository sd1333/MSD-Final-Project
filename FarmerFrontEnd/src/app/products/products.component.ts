import { Component, OnInit, Inject } from '@angular/core';
import { FarmerService } from '../services/farmer.service';
import { Router } from '@angular/router'



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

interface IProduct {
  _id: string,
  product: IProductDetails,
  farmer: IFarmerDetails
}


@Component({
  selector: 'app-products',
  template: `
 
  <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>

  <h1>Your product inventory</h1>
  <div class="addaproduct">
      <a class="addproduct" [routerLink]="['', 'addproduct']">Add a product</a>
  </div>

  <br>

  <div class="producttablediv">
    <div class="producttable">
      <table>
      <thead>
          <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Merchant</th>
              <th>Merchant Rating</th>
              
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of products">
              <td>{{ item.product.productName }}</td>
              <td>{{ item.product.price }}</td>
              <td>{{ item.product.qty }}</td>
              <td>{{ item.farmer.firstName }}</td>
              <td>{{ item.farmer.rating}}</td>
              <td>
                <a [routerLink]="['', 'editproduct']" class="edit" [state]="{id: item._id}">Edit</a>
                <button type="button" class="delete" (click)="onDelete(item._id)" >Delete</button>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

`,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  token: string
  products

  constructor(
    @Inject('AppStore') private appStore,
    private farmerService: FarmerService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }

    this.farmerService.getProducts()
      .subscribe((response: IProduct) => {
        this.products = response
        // console.log("this.products[0]._id: ", this.products[0]._id)
      })
  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    this.router.navigate([""])
  }

  onDelete(productId: string) {
    console.log("onDelete productId: ", productId)
    this.farmerService.deleteProduct(productId)
      .subscribe((response) => {
        console.log('onDelete response: ', response)

        this.farmerService.getProducts()
          .subscribe((response) => {
            this.products = response
          })
      })
  }


}
