import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionService } from "src/app/session.service";
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class InteractDBService {

  varuable;
  UserEmailId: string;
  UserId: string;
  UserType: string;

  triggerLoginButtonHide = new EventEmitter<string>();
  headers =  new Headers({'Content-Type':'application/json'});

  loginUrl = 'http://localhost:3001/check/user/login';
  registerURl = 'http://localhost:3001/check/user/register';
  chatUrl = 'http://localhost:3001/check/admin/fetchchat'; 
  constructor(private http: Http,
              private router: Router,
              private sessionService: SessionService,
              private httpClient:  HttpClient) { }


  checkLogin(servers: any){
     return this.http.post(this.loginUrl,servers,{headers: this.headers} );
   }

   googleLogin(){
    window.location.href="http://localhost:3001/check/utility/google";
   }

   regisetUser(servers: any){
      return this.http.post(this.registerURl,servers,{headers: this.headers} )
  }

  fetchChat(): Observable<any>{
    return this.httpClient.get(this.chatUrl);
  }
}
