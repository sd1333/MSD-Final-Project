
import { Component, OnInit, Inject } from '@angular/core';
import { FarmerService } from '../services/farmer.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'

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
  selector: 'app-add-product',
  template: `
   
    <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>
    <div>
      <form [formGroup]="addProductForm" (ngSubmit)="onSubmit()" >

        <div>
          <label for="productName">Product Name: </label>  <br>
          <input type="text" class="form-control" id="productName" formControlName="productName">
        </div>
        <div>
          <label for="price">Price: </label> <br>
          <input type="number" class="form-control" id="price" formControlName="price">
        </div>
        <div>
          <label for="qty">Quantity: </label> <br>
          <input type="number" class="form-control" id="qty" formControlName="qty">
        </div>

        <button type="submit">Add Product!</button>

      </form>
    </div>

  
  `,
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  token: string
  productId: string
  addProductForm: FormGroup

  constructor(
    @Inject('AppStore') private appStore,
    private formBuilder: FormBuilder,
    private farmerService: FarmerService,
    private router: Router
  ) {

    this.addProductForm = formBuilder.group({
      "productName": ['', [Validators.required]],
      "price": ['', [Validators.required]],
      "qty": ['', Validators.required]
    })
  }

  ngOnInit(): void {

    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }

  }

  onSubmit() {
    const productBody = this.addProductForm.value
    console.log("productFormInfo: ", productBody)

    this.farmerService.addProduct(productBody)
      .subscribe((response) => {
        console.log('addProduct response: ', response)
        this.router.navigate(["products"])
      })

    // this.farmerService.editProduct(productBody)
    //   .subscribe((response) => {
    //     console.log('editProduct Response: ', response)
    //     this.router.navigate(["products"])
    //   })

  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    this.router.navigate([""])
  }

}
