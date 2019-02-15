
import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from "rxjs";

import 'rxjs/add/operator/map'; 


@Injectable({
  providedIn: 'root'
})
export class PlayDBService {

  headers =  new Headers({'Content-Type':'application/json'});
 
  constructor(
              private http1 : HttpClient,
              private router:Router) { }
  
    public _playersUrl : string = 'http://localhost:3001/check/utility/player';
    public _playerDetails : string = 'http://localhost:3001/check/utility/player/';

    getPlayers() : Observable<any> {
     
      return this.http1.get(this._playersUrl).map((data) => data);;
    }
  
    getPlayerDetails(id) : Observable<any> {
      return this.http1.get<any>(this._playerDetails+id).map((data) => data);
    } 
}
