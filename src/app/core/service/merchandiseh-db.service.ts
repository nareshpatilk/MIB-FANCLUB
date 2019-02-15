import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { SessionService } from "src/app/session.service";

@Injectable({
  providedIn: 'root'
})
export class MerchandisehDBService {

  token: any;
  headers: any;
  productsUrl = 'http://127.0.0.1:3001/shop/products/get-products';
  categoryUrl = 'http://127.0.0.1:3001/shop/categories/get-category';
  filterUrl = 'http://127.0.0.1:3001/shop/products/filtercategory';
  productSend = 'http://127.0.0.1:3001/shop/products/get-product/';
  cartaddUrl = 'http://127.0.0.1:3001/shop/products/add-to-cart/';
  cartgetUrl = 'http://127.0.0.1:3001/shop/categories/get-cart-details/';
  deleteMyProduct = 'http://127.0.0.1:3001/shop/categories/delete-myproduct';
  orderMyProduct = 'http://127.0.0.1:3001/shop/categories/order-my-product';
  updateProfileUrl = 'http://127.0.0.1:3001/check/admin/profile-update';

  getProfileUrl = 'http://127.0.0.1:3001/check/admin/get-myprofile/';
  productUrl = '';

  constructor(private http: HttpClient,
    private sessionService: SessionService,
    private router: Router) { }

  getAllProducts() {
    return this.http.get<any[]>(this.productsUrl).map((data) => data);
  }

  getAllCategories() {
    return this.http.get<any[]>(this.categoryUrl).map((data) => data);
  }

  getFilteredProducts(category_id) {
    return this.http.post<any[]>(this.filterUrl, { category_id }).map((data) => data);
  }

  getProduct(productId) {

    this.productUrl = this.productSend + productId;
    return this.http.get<any[]>(this.productUrl).map((data) => data);
  }

  addToCartVerify(cart_data) {
    const header = new Headers();
    const token = this.sessionService.getValueFromSession("_XTX");
    return this.http.post<any>(this.cartaddUrl, cart_data, {
      headers: {
        'Content-Type': 'application/json',
        'authentication': token
      }
    }).map((data) => data);
  }

  getCartDetails() {
    let userId = this.sessionService.getValueFromSession("_iXd");
    return this.http.get<any>(this.cartgetUrl + userId).map((data) => data)
  }

  deleteProductFromCart(cartId) {
    let userId = this.sessionService.getValueFromSession("_iXd");
    let token = this.sessionService.getValueFromSession("_XTX");
    let dataC = {
      cartId: cartId
    }

    {
      const  headers  =  new  HttpHeaders(
        {
          'Content-Type' :  'application/json', 'authentication': token
        });
      return  this.http.post(this.deleteMyProduct, dataC, { headers: headers }).map(data  =>  data)
    }


  }

  myPurchaseOrder(): Observable<any> {
    let userId = this.sessionService.getValueFromSession("_iXd");
    let datatoOrder = {
      userId: userId
    }

    return this.http.post(this.orderMyProduct, datatoOrder, {
      headers: {
        'Content-Type': 'application/json',
        'authentication': this.sessionService.getValueFromSession("_XTX")
      }
    }).map((data) => data);
  }

  updateProfile(formdata, token): Observable<any> {
    return this.http.post(this.updateProfileUrl, formdata, {
      headers: {
        'Content-Type': 'application/json',
        'authentication': token
      }
    }).map((data) => data);

  }

  getMyProfile(userid): Observable<any> {
    return this.http.get(this.getProfileUrl + userid).map((data) => data)
  }
}
