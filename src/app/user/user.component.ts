import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { InteractDBService } from '../interact-db.service';
import { SessionService } from "src/app/session.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  
})
export class UserComponent implements OnInit {

  varuable;
  UserEmailId: string;
  UserId: string;
  UserType: string;
  passwordNotMacthed: string;
  emailError: string;

  constructor(private http: Http,
    private router: Router,
    private interactDbservice: InteractDBService,
    private sessionService: SessionService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
   this.interactDbservice.checkLogin({email:form.value.email,password:form.value.password}).subscribe(status => {
    
      this.varuable = status;
      var temp1 =  this.varuable._body;
      let dumdata = JSON.parse(temp1);
     
      
        this.UserId = dumdata._id;
        this.UserEmailId = dumdata.userName;//email
        this.UserType = dumdata.userType;
        
       // if(status)
        this.interactDbservice.triggerLoginButtonHide.emit(dumdata.data.pFullName);
       
        this.sessionService.setValueToSession('isLoggedIn',true);
        this.sessionService.setValueToSession('UserEmailId',dumdata.data.userName);
        this.sessionService.setValueToSession('_XTX',dumdata.token);
        this.sessionService.setValueToSession('_uXu', dumdata.data.userType);
        this.sessionService.setValueToSession('_rXr', dumdata.data.pFullName);
        this.sessionService.setValueToSession('_iXd', dumdata.data._id);
        this.router.navigate(['home']);
     
   },err  =>{
    
    this.varuable = err;
    let dumdata = JSON.parse(this.varuable._body);
    this.passwordNotMacthed = dumdata.error;
   alert(this.passwordNotMacthed);
   
   })

  }

  signInGoogle(){
    this.interactDbservice.googleLogin();
  }

  routeToRegister(){
    this.router.navigate(['login-information/register']);
  }

}
