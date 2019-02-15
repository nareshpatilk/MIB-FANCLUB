import { Component, OnInit } from '@angular/core';
import { MerchandisehDBService } from "src/app/core/service/merchandiseh-db.service";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId : any;
  public product ;
  constructor(private router : Router,
              private merchandisehDBService: MerchandisehDBService,
              private route: ActivatedRoute,
              private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.params.id;
    this.getMyProduct(this.productId);
    
  }

  getMyProduct(productId) {
    this.merchandisehDBService.getProduct(productId).subscribe((data) => {
     
      let temp = JSON.parse(JSON.stringify(data));
       this.product = temp.data;
      
      
    });
  }

  goToCart(qty: HTMLInputElement){



    if(qty.value == '' ){
      qty.value = "1";
      //if(qty.value.startsWith("-"))

    }else if(this.sessionService.getValueFromSession("_XTX") == ''){
      alert("Please Login To App ");
    }else{
    let dataVal  = { 
        qty: qty.value,
        userId : this.sessionService.getValueFromSession("_iXd"),
        productId: this.product._id,
        fromPlace: true
    }
    this.merchandisehDBService.addToCartVerify(dataVal).subscribe(data => {
          alert(data.success);
          this.router.navigate (['merchandise/cart'])
    },err => {
      alert(err.error);
    })
  }
  
    
  }
  back(){
    
      this.router.navigate (['merchandise/products'])
    }

    addToCart(qty : HTMLInputElement){

      if(qty.value == '' ){
        qty.value = "1";

      }else if(this.sessionService.getValueFromSession("_XTX") == ''){
        alert("Please Login To App ");
      }else{
      let dataVal  = { 
          qty: qty.value,
          userId : this.sessionService.getValueFromSession("_iXd"),
          productId: this.product._id,
          fromPlace: true
      }
      this.merchandisehDBService.addToCartVerify(dataVal).subscribe(data => {
            alert(data.success);
      },err => {
        alert(err.error);
      })
    }
  }
}
