import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { InteractDBService } from '../../../interact-db.service';
import { SessionService } from "src/app/session.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  varuable:any;
  emailPresent:any;
  constructor(private interactDBService: InteractDBService,
              private router : Router,
              private sessionService: SessionService) { }

  ngOnInit() {
  }

  onSubmitPost(form: NgForm){
    var pwd  = form.value.password;
    var full = form.value.fullName;
    var mail = form.value.email;
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (mail != "" && (mail.length <= 5 || !EMAIL_REGEXP.test(mail))) {
      alert ( "Please provide a valid email");
  }
    if(pwd.length < 6 ){
      alert('Password length must be 6 characters');
    }else if(full.length <2 ){
      alert('Please enter Full Name');
    }else{
    this.interactDBService.regisetUser({fullName:form.value.fullName,
                                        email:form.value.email,
                                        password:form.value.password,
                                        oAuthSource:'',
                                        oAuthID:'',
                                        phonenumber:'',
                                        address:'',
        }).subscribe(status => {
                                        
          this.varuable = status;
          
          let dumdata = JSON.parse(this.varuable._body);
  
          console.log(dumdata);
          //this.interactDBService.triggerLoginButtonHide.emit(dumdata.maindata.pFullName);
          // this.sessionService.setValueToSession('isLoggedIn', true);
          // this.sessionService.setValueToSession('_XTX', '');
          // this.sessionService.setValueToSession('_uXu', dumdata.maindata.userType);
          // this.sessionService.setValueToSession('_rXr', dumdata.maindata._id);
       
          this.router.navigate(['/user-access']);
          alert(`${dumdata.msg} Register!`)
        },err => {
          this.varuable = err;
          console.log(err);
            let dumdata = JSON.parse(this.varuable._body);
            this.emailPresent = dumdata.error;
           alert(this.emailPresent);
        });
      }
  }

  validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

}
