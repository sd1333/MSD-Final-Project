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
  selector: 'app-edit-product',
  template: `
    <p>this is edit product</p>
    <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>
    <div>
      <form [formGroup]="editProductForm" (ngSubmit)="onSubmit()" >

        <div>
          <label for="productName">Product Name: </label> <br>
          <input type="text" class="form-control" id="productName" formControlName="productName">
        </div>
        <div>
          <label for="price">Price: </label> <br>
          <input type="number" class="form-control" id="price" formControlName="price" step="any" min="1">
        </div>
        <div>
          <label for="qty">Quantity: </label> <br>
          <input type="number" class="form-control" id="qty" formControlName="qty">
        </div>

        <button type="submit">Update!</button>

      </form>
    </div>




  
  `,
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  token: string
  productId: string
  editProductForm: FormGroup

  constructor(
    @Inject('AppStore') private appStore,
    private formBuilder: FormBuilder,
    private farmerService: FarmerService,
    private router: Router
  ) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.productId = this.router.getCurrentNavigation().extras.state.id
      localStorage.setItem('productId', this.productId)
    } else {
      this.productId = localStorage.getItem('productId')
    }



    this.editProductForm = formBuilder.group({
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

    this.farmerService.getProduct(this.productId)
      .subscribe((response: IProduct) => {
        console.log("Response: ", response)
        const product = response.product

        this.editProductForm.get("productName").setValue(product.productName)
        this.editProductForm.get("price").setValue(product.price)
        this.editProductForm.get("qty").setValue(product.qty)
      })

  }

  onSubmit() {
    const productFormInfo = this.editProductForm.value
    console.log("productFormInfo: ", productFormInfo)

    const productBody = { ...productFormInfo, _id: this.productId }

    this.farmerService.editProduct(productBody)
      .subscribe((response) => {
        console.log('editProduct Response: ', response)
        localStorage.removeItem('productId')
        this.router.navigate(["products"])
      })
  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    localStorage.removeItem('productId')
    this.token = ''
    this.router.navigate([""])
  }

}
