import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MerchandisehDBService } from "src/app/core/service/merchandiseh-db.service";
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products = [];
  public categories = [];  
  selectedCategory = [];
  public noProducts;

  constructor(private merchandisehDBService: MerchandisehDBService,
              private sessionService: SessionService,
            private router: Router) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    this.merchandisehDBService.getAllCategories().subscribe((data) => {console.log(data);
      this.categories = data;
    });
  }

  filter(event,category_id) {

    if (event.target.checked) {
        this.selectedCategory.push(category_id);
      } else if (!event.target.checked) {
        const index: number = this.selectedCategory.indexOf(category_id);
        this.selectedCategory.splice(index, 1);
      }

      if(this.selectedCategory.length == 0) {
        this.getProducts();
      } else {
        this.merchandisehDBService.getFilteredProducts(this.selectedCategory).subscribe((data) => {
          console.log(data['data'].length);
           if(data['data'].length != 0) {
            this.products = data;
            this.noProducts = false;           
           } else  if(data['data'].length == 0) {
             this.noProducts = true;
             this.products = [];
           }
        });
      }
  }

  getProducts() {
    this.merchandisehDBService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
      this.noProducts = false;    
    });
  }

  goToProductList(productId) {
    this.router.navigate(['merchandise/product-detail/'+productId]);
  }

  addToCartList(productId){
    if(this.sessionService.getValueFromSession("isLoggedIn")){
      let userId= this.sessionService.getValueFromSession("_iXd");
     let data = {
        productId : productId,
        userId    : userId,
        qty: 1
     }
      this.merchandisehDBService.addToCartVerify(data).subscribe(data => {
       
       alert(data.success);
       // this.router.navigate(['merchandise/cart']);
      },err => {
        alert(err.error);
      });
    }else
      alert("Please Login To ADD Cart");
  }

}
