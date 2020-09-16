import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  token = ''

  constructor(@Inject('AppStore') private appStore) {

  }

  intercept(req, next) {

    if (this.appStore.getState().token) {
      this.token = this.appStore.getState().token
    } else if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'))
    }


    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    })
    return next.handle(tokenizedRequest)
  }

}
