import { Component, OnInit } from '@angular/core';
import { InteractDBService } from "src/app/interact-db.service";
import { Router } from "@angular/router";
import { SessionService } from "src/app/session.service";
import { NgForm } from "@angular/forms";
import { MerchandisehDBService } from "src/app/core/service/merchandiseh-db.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileName:string;
  profileEmail:string;
  profileNumber:string;
  profileAddress:string
  constructor(private interactDBService: InteractDBService,
              private router : Router,
              private sessionService: SessionService,
              private merchandisehDBService: MerchandisehDBService) { }

  ngOnInit() {
    this.getprofile();
  }
  fullName:string;
  phoneNumber:string;
  email:string;
  address:string;
  getprofile(){
    this.merchandisehDBService.getMyProfile(this.sessionService.getValueFromSession("_iXd")).subscribe
    (data => {
      var val = data;
        this.fullName=val.data.fullName;
        this.phoneNumber=val.data.phoneNumber;
        this.address=val.data.address;
        this.email =val.data.email;
      
      //  form.value.fullName = val.data.fullName;
      //  form.value.email = val.data.email;
      //  form.value.phoneNumber = val.data.phoneNumber;
      // form.value.address = val.data.address;
      
    },err => {
      alert(err.error);
    })
  }
  onSubmitProfile(form: NgForm){
    if(form.value.fullName == '' || form.value.fullName.length <= 3){
      alert("Full Name must contain 3 character");
    }else if( form.value.phoneNumber.length <= 9){
      alert("Number must be 10 digits")
    }else if(form.value.address == '' || form.value.address.trim() == '' ){
      alert("Please Enter Address ")
    }else{
     var dataSent = {
       userId : this.sessionService.getValueFromSession("_iXd"),
       fullName: form.value.fullName,
       phoneNumber: form.value.phoneNumber,
       address:form.value.address
     }
     this.merchandisehDBService.updateProfile(dataSent,this.sessionService.getValueFromSession("_XTX")).subscribe(data => {
       alert(data.success);
       this.getprofile();
     },err => {
       alert(err.error);
     })
    }
  }

}
