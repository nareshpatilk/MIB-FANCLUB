import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
  })
export class ServerServices{

    // varuable;
    // UserEmailId;
    // UserId;
    // UserType;
    triggerLoginButtonHide = new EventEmitter<any>();
    constructor() {}

   
    // checkLogin(servers: any){
        
    //     const headers =  new Headers({'Content-Type':'application/json'});
      
    //     return this.http.post('http://localhost:3001/check/user/login',servers,
    //     {headers: headers} ).subscribe(status => {
    //         console.log(status);
    //         this.varuable = status;
         
    //         this.UserId = this.varuable._body._id;
    //         this.UserEmailId = this.varuable._body.userName;//email
    //         this.UserType = this.varuable._body.userType;
           
    //     });
    // }
}