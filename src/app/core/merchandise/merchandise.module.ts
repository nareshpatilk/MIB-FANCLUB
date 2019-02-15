import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MerchandiseRoutingModule } from './merchandise-routing.module';
import { MerchandiseComponent } from './merchandise.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    MerchandiseRoutingModule,
    FormsModule
  ],
  declarations: [MerchandiseComponent, ProductListComponent, ProductDetailComponent, CartDetailComponent, ProfileComponent],
  entryComponents: [
    ProductListComponent
  ]
})
export class MerchandiseModule { }
