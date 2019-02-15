import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map'; 
import { SessionService } from "src/app/session.service";

@Injectable({
  providedIn: 'root'
})
export class VideofetchService {

  url = "http://localhost:3001";
  constructor(private http: HttpClient,
               private router: Router,
                private sessionService: SessionService) { }

    getVideos(): Observable <any>{
      
      let lurl = `${this.url}/check/utility/videoAll`;
      return this.http.get<any>(lurl,).map((data) => data);
      //return this.http.get<any>(url1).map((data) => data);
      
    }          

    getVideoComments(ComObj: any): Observable<any> {
      let contentUrl = this.url+"/check/utility/getComments/";
      const headers = new Headers();
  
      // return this.http.post<any>(contentUrl, ComObj,{
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'authentication': "token"
      //   }
      // });
      return this.http.get(contentUrl+ComObj);
    }
   
    postVideosComments(commObject: any,token): Observable<any> {
      let contentUrl = this.url+"/check/utility/addComments";
      const headers = new Headers();
     // alert(commObject);
      return this.http.post<any>(contentUrl, commObject,{
        headers: {
          'Content-Type': 'application/json',
          'authentication': token
        }
      });
    }

    postVideosLikes(commObject: any,token): Observable<any> {
      let contentUrl = this.url+"/check/utility/endPointlikes";
      const headers = new Headers();
  
      return this.http.post<any>(contentUrl, commObject,{
        headers: {
          'Content-Type': 'application/json',
          'authentication': token
        }
      });
    }

    getLDval(commObject: any): Observable<any> {
      let contentUrl = this.url+"/check/utility/getCountLDval/";
      const headers = new Headers();
      
      return this.http.post(contentUrl,commObject);
    }
    
}
