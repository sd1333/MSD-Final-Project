import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  // signUp(userInfo) {
  //   console.log("AuthService SignUp UserInfo: ", userInfo)
  //   return this.http.post('https://cs583finalapi.herokuapp.com/farmersignup', userInfo)
  // }

  // signIn(creds) {
  //   console.log("AuthService SignIn creds: ", creds)
  //   return this.http.post('https://cs583finalapi.herokuapp.com/farmersignin', creds)
  // }

  signUp(userInfo) {
    console.log("AuthService SignUp UserInfo: ", userInfo)
    return this.http.post('https://cs583finalapi.herokuapp.com/farmersignup', userInfo)
  }

  signIn(creds) {
    console.log("AuthService SignIn creds: ", creds)
    return this.http.post('https://cs583finalapi.herokuapp.com/farmersignin', creds)
  }
}
