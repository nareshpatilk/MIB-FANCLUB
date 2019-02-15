import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchandiseComponent } from "src/app/core/merchandise/merchandise.component";
import { ProductListComponent } from "src/app/core/merchandise/product-list/product-list.component";
import { ProductDetailComponent } from "src/app/core/merchandise/product-detail/product-detail.component";
import { CartDetailComponent } from "src/app/core/merchandise/cart-detail/cart-detail.component";
import { ProfileComponent } from "src/app/core/merchandise/profile/profile.component";

const routes: Routes = [{
  path: '', component: MerchandiseComponent, children: [
    { path: 'products', component: ProductListComponent },
    { path: 'cart', component: CartDetailComponent },
    { path: 'product-detail/:id', component: ProductDetailComponent },
    { path: 'profile', component: ProfileComponent},
 { path : '**', redirectTo: 'product-list' }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchandiseRoutingModule { }
