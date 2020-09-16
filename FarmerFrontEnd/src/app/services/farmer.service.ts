import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  token: string = ''

  constructor(
    private http: HttpClient,
    @Inject('AppStore') private appStore
  ) { }

  getProducts() {
    return this.http.get("https://cs583finalapi.herokuapp.com/farmer")
  }
  getProduct(productId) {
    console.log('from farmerservice productId: ', productId)
    return this.http.get(`https://cs583finalapi.herokuapp.com/farmer/${productId}`)
  }

  editProduct(productBody) {
    console.log('from farmerservice: ', productBody)
    return this.http.patch(`https://cs583finalapi.herokuapp.com/farmer/${productBody._id}`, productBody)
  }

  deleteProduct(productId) {
    console.log("from farmerservice productId: ", productId)
    return this.http.delete(`https://cs583finalapi.herokuapp.com/farmer/${productId}`)
  }

  addProduct(productBody) {
    console.log("from farmservice addproduct: ", productBody)
    return this.http.post(`https://cs583finalapi.herokuapp.com/farmer/`, productBody)
  }

  getOrders() {
    return this.http.get("https://cs583finalapi.herokuapp.com/farmer/orders")
  }

  getOrder(orderId) {
    return this.http.get(`https://cs583finalapi.herokuapp.com/farmer/order/${orderId}`)
  }

  updateOrderStatus(orderId, body) {
    console.log('body: ', body)
    return this.http.patch(`https://cs583finalapi.herokuapp.com/farmer/orderstatus/${orderId}`, body)
  }

  viewOrderByStatus(status) {
    console.log('viewOrderByStatus: ', status)
    return this.http.get(`https://cs583finalapi.herokuapp.com/farmer/orders/bystatus/${status}`)
  }
}
