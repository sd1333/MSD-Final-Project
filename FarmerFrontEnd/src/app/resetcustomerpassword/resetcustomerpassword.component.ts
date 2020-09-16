import { Component, OnInit, Inject } from '@angular/core';
import { SuperuserService } from '../services/superuser.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-resetcustomerpassword',
  template: `
    <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>

    <h1>Change Password for {{customer.firstName + ' ' + customer.lastName}}</h1>

    <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
      <div>
          <label for="newPassword">New Password: </label> <br>
          <input type="text" class="form-control" id="newPassword" formControlName="newPassword">
      </div>
      <br>
      
      <div class="signinbutton">
        <button type="submit">Change Password!</button>
      </div>
    </form>

  `
  ,
  styleUrls: ['./resetcustomerpassword.component.css']
})
export class ResetcustomerpasswordComponent implements OnInit {

  resetForm: FormGroup
  token: string
  customerId: string
  customer

  constructor(
    @Inject('AppStore') private appStore,
    private superuserservice: SuperuserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.customerId = this.router.getCurrentNavigation().extras.state.id
      localStorage.setItem('customerId', this.customerId)
    } else {
      this.customerId = localStorage.getItem('customerId')
    }

    this.resetForm = formBuilder.group({
      "newPassword": ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }

    this.onGetCustomer(this.customerId)

  }

  onGetCustomer(id) {
    this.superuserservice.getCustomer(id)
      .subscribe((response) => {
        console.log('onGetcustomer response: ', response)
        this.customer = response
      })
  }

  parentLogOut($event) {
    this.appStore.dispatch({
      type: 'LOGOUT'
    })
    this.token = ''
    this.router.navigate([""])
  }

  onSubmit() {
    const resetFormVal = this.resetForm.value
    console.log('resetFormVal: ', resetFormVal)

    this.superuserservice.changeCustPass(this.customerId, resetFormVal)
      .subscribe((response) => {
        console.log(response)
        this.router.navigate(['allaccounts'])
      })
  }

}
