import { Component, OnInit, Inject } from '@angular/core';
import { SuperuserService } from '../services/superuser.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface IFarmerDetails {
  role: string,
  rating: number,
  _id: string,
  firstName: string,
  lastName: string,
  email: string
}

@Component({
  selector: 'app-resetpassword',
  template: `
    <app-nav-bar [navToken]="token" (logoutEvent)="parentLogOut($event)"></app-nav-bar>

    <h1>Change Password for {{farmer.firstName + ' ' + farmer.lastName}}</h1>

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
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup
  token: string
  farmerId: string
  farmer

  constructor(
    @Inject('AppStore') private appStore,
    private superuserservice: SuperuserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.farmerId = this.router.getCurrentNavigation().extras.state.id
      localStorage.setItem('farmerId', this.farmerId)
    } else {
      this.farmerId = localStorage.getItem('farmerId')
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

    this.onGetFarmer(this.farmerId)

  }

  onGetFarmer(id) {
    this.superuserservice.getFarmer(id)
      .subscribe((response) => {
        console.log('onGetFarmeR response: ', response)
        this.farmer = response
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

    this.superuserservice.changePass(this.farmerId, resetFormVal)
      .subscribe((response) => {
        console.log(response)
        this.router.navigate(['allaccounts'])
      })
  }

}
