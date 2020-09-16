import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { createStore } from 'redux'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TestComponent } from './testcomponent/test.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersComponent } from './orders/orders.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AllaccountsComponent } from './allaccounts/allaccounts.component';

import { MaterialModule } from './material.module';

import { TokenInterceptorService } from './services/token-interceptor.service'

import { AuthGuard } from './guards/auth.guard';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

import rootReducer from './rootReducer';
import { AlltransactionsComponent } from './alltransactions/alltransactions.component';
import { AllrequestsComponent } from './allrequests/allrequests.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ResetcustomerpasswordComponent } from './resetcustomerpassword/resetcustomerpassword.component'
import { TransactiondetailsComponent } from './transactiondetails/transactiondetails.component';



const appStore = createStore(rootReducer)

const MY_ROUTES: Routes = [
  {
    path: 'farmer',
    loadChildren: () => import('./farmer/farmer.module').then(m => m.FarmerModule)
  },
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editproduct',
    component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editorder',
    component: EditOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adminlogin',
    component: AdminloginComponent
  },
  {
    path: 'allaccounts',
    component: AllaccountsComponent
  },
  {
    path: 'alltransactions',
    component: AlltransactionsComponent
  },
  {
    path: 'allrequests',
    component: AllrequestsComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent
  },
  {
    path: 'resetcustomerpassword',
    component: ResetcustomerpasswordComponent
  },
  {
    path: 'transactiondetails',
    component: TransactiondetailsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    NavBarComponent,
    TestComponent,
    OrdersComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    EditOrderComponent,
    AdminloginComponent,
    AllaccountsComponent,
    AlltransactionsComponent,
    AllrequestsComponent,
    ResetpasswordComponent,
    ResetcustomerpasswordComponent,
    TransactiondetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(MY_ROUTES, { preloadingStrategy: PreloadAllModules }),
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule, // this might be where an issue will be. Look here ==================
    MaterialModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'AppStore', useValue: appStore },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
