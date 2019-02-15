import { Component, OnInit } from '@angular/core';
import { MerchandisehDBService } from "src/app/core/service/merchandiseh-db.service";
import { SessionService } from "src/app/session.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cartDetail : string[];
  totalPrice: any;
  constructor(private router : Router,
              private merchandisehDBService: MerchandisehDBService,
              private route: ActivatedRoute,
              private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.getMyCartDetail();
  }

  getMyCartDetail(){

    this.merchandisehDBService.getCartDetails().subscribe(data => {
      
      
      this.cartDetail = data.data;
      this.totalPrice = data.totalPrice;

    }, err => {
      alert(err.error)
    });
  }

  deleteThisProduct(cartId){
    
    this.merchandisehDBService.deleteProductFromCart(cartId).subscribe(data => {
      
      this.getMyCartDetail();
    }, err => {
    
      alert(err.error);
    })
  }

  goToShop(){
    this.router.navigate(['merchandise/products']); 
  }
  purchaseOrder(){

    this.merchandisehDBService.myPurchaseOrder().subscribe(data => {
     
    
    alert(data.success);
    this.getMyCartDetail();
    },err => {
        console.log("errrrrr",err);
    })
  }
}
