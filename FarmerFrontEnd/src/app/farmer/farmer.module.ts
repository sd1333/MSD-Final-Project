import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { NavBarComponent } from '.././nav-bar/nav-bar.component'

const MY_ROUTES: Routes = [

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(MY_ROUTES)
  ]
})

export class FarmerModule { }
