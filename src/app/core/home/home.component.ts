import { Component, OnInit } from '@angular/core';
import { SessionService } from "src/app/session.service";

import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router"; 
import { InteractDBService } from "src/app/interact-db.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sessionService: SessionService,private router : Router,
               private route: ActivatedRoute,
               private interactDBService: InteractDBService) { }


  ngOnInit() {
    let Token = this.route.snapshot.paramMap.get('Token');
            let user = this.route.snapshot.paramMap.get('user');
            let type = this.route.snapshot.paramMap.get('type');
            let _id = this.route.snapshot.paramMap.get('id');
      
            if(Token!=null)
            {
                console.log("Token : "+Token+"user : "+user+"type : "+type);
                this.sessionService.setValueToSession('isLoggedIn', true);
                this.sessionService.setValueToSession('_XTX',Token);
                this.sessionService.setValueToSession('_uXu', user);
                this.sessionService.setValueToSession('_rXr', type);
                this.sessionService.setValueToSession('_iXd', _id);
                this.interactDBService.triggerLoginButtonHide.emit(user);
                this.router.navigate(['/']);
            } 
  }

}
