import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SuperuserService {

  token: string = ''

  constructor(
    private http: HttpClient,
    @Inject('AppStore') private appStore
  ) { }

  getFarmer(id) {
    return this.http.get(`https://cs583finalapi.herokuapp.com/superuser/getfarmer/${id}`)
  }

  getFarmers() {
    return this.http.get("https://cs583finalapi.herokuapp.com/superuser/getfarmers")
  }

  getCustomer(id) {
    return this.http.get(`https://cs583finalapi.herokuapp.com/superuser/getcustomer/${id}`)
  }

  getCustomers() {
    return this.http.get("https://cs583finalapi.herokuapp.com/superuser/getcustomers")
  }

  farmerActivationToggle(id) {
    console.log('farmerActivationToggle id: ', id)
    return this.http.patch(`https://cs583finalapi.herokuapp.com/superuser/farmeractivationtoggle`,
      { id: id })
  }

  customerActivationToggle(id) {
    console.log('customerActivationToggle id: ', id)
    return this.http.patch(`https://cs583finalapi.herokuapp.com/superuser/customeractivationtoggle`,
      { id: id })
  }

  changePass(id, newPass) {
    console.log('changePass from service newPass: ', newPass)
    return this.http.patch(`https://cs583finalapi.herokuapp.com/superuser/farmer/${id}`, newPass)
  }

  changeCustPass(id, newPass) {
    console.log('changeCustPass from service newPass: ', newPass)
    return this.http.patch(`https://cs583finalapi.herokuapp.com/superuser/customer/${id}`, newPass)
  }

  getTransactions() {
    return this.http.get(`https://cs583finalapi.herokuapp.com/superuser/transactions`)
  }

  getOrder(orderId) {
    return this.http.get(`https://cs583finalapi.herokuapp.com/superuser/order/${orderId}`)
  }

  getRequestsLog() {
    return this.http.get(`https://cs583finalapi.herokuapp.com/superuser/requestlog`)
  }

  // getProducts() {
  //   return this.http.get("https://cs583finalapi.herokuapp.com/farmer")
  // }

}
