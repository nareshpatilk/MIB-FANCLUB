import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { InteractDBService } from '../../interact-db.service';
import { SessionService } from "src/app/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  emailLoginButton:string;
  constructor(private router: Router,
              private interactDBService: InteractDBService,
              private sessionService:SessionService) {
              
                this.interactDBService.triggerLoginButtonHide.subscribe(
                  (loginHideButton: string) => {
                    
                    this.emailLoginButton = loginHideButton ;
                  }
                    
                  
                );
               }

  ngOnInit() {
    this.emailLoginButton = this.sessionService.getValueFromSession("_rXr");
    if(this.emailLoginButton)
      this.sessionService.setValueToSession("isLoggedIn",true);
    if(!this.sessionService.getValueFromSession("isLoggedIn"))
      this.sessionService.clearSession();
  }

  openCart() {
    if(this.sessionService.getValueFromSession("isLoggedIn"))
      this.router.navigate(['merchandise/cart']);
    else
      alert ("Please Login To Select Cart");
  }

  openLogin() {
    // this.router.navigate(['login-information/user-access']);
    this.router.navigate(['user-access']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goTovideos() {
    this.router.navigate(['videos']); 
  }

  goToStats() {
    this.router.navigate(['login-information/player']); 
  }

  goToShopping() {
    this.router.navigate(['merchandise/products']); 
  }

  goToChats() {

  }

  goToAboutUS() {
    if(this.sessionService.getValueFromSession("isLoggedIn"))
      this.router.navigate(['merchandise/profile']); 
    else
      alert("Please Login to Updated Profile")
  }

  openLogut(){
    this.sessionService.clearSession();
    this.router.navigate(['user-access']); 
    this.emailLoginButton = '';
  }
}
