import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { InteractDBService } from "src/app/interact-db.service";
import { SessionService } from "src/app/session.service";

import { Action } from '../model/action';
import { Event } from '../model/event';
import { Message } from '../model/message';
import { User } from '../model/user';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit {

  toggleDisp = true;
  questions = [];
  answers : string[] = [];
  randomAns:string;
  randomVal :number = 0;
  answerToggle = true;

  //////////////////
  action = Action;
  user: User;
  messages: string[] = [];
  messageContent: string;
  ioConnection: any;
  queAnsList :string[] = [];

  // socket = io.connect('http://localhost:3001');
  constructor(private interactDbService : InteractDBService,
              private sessionServices: SessionService,
              private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.initSocket();
    
    this.socketService.onMessage();

    setTimeout(() => {
      this.initIoConnection();
    }, 0);
  }

  //  message = document.getElementById('message');;
  // handle = document.getElementById('handle');
  // btn = document.getElementById('send');
  // output = document.getElementById('output');
  // feedback = document.getElementById('feedback');
 
userEmailId: string = this.sessionServices.getValueFromSession('UserEmailId');
userName: string = this.sessionServices.getValueFromSession('_rXr');
userQType: string = this.sessionServices.getValueFromSession("_uXu");


  onToggleDisp(){
    this.toggleDisp = !this.toggleDisp;
    this.getChatInitDetails();
  }

  getChatInitDetails(){
    this.questions=[];
    this.interactDbService.fetchChat().subscribe(data =>
       {
        this.queAnsList = data.data;
          let v1 = data;
          v1.data.forEach(element => {
            
              this.questions.push(element.question);
              for(let i = 0 ; i <element.answer.length ; i++ ){
                this.answers.push(element.answer[i]);
               }
              
             });
             
             
       },err => {
        alert("Server Down");
      });
     }

     showAnswers(){
       this.answerToggle = !this.answerToggle;
       var len = this.answers.length;
       this.randomAns = this.answers[(Math.floor(Math.random() * len/2  ) +1)]
     }

     checkLogged(){
        if(!this.sessionServices.getValueFromSession('isLoggedIn')){
          alert('Please Login to chat')
        }
      }

      startChat(messageVal: HTMLInputElement){
        if(!this.sessionServices.getValueFromSession('isLoggedIn')){
          alert('Please Login to chat')
        }else{
          this.socketService.joinchat(this.userEmailId);

          let tempval = this.sessionServices.getValueFromSession('_rXr')+" : "+messageVal.value;
          this.socketService.send( tempval );
            this.messageContent = null;
            messageVal.value = '';
        }
      }

      private initIoConnection(): void {
        this.socketService.initSocket();
    
        this.ioConnection = this.socketService.onMessage()
          .subscribe((message: string) => {
            let temp = message
            this.messages.push(temp);
          });
    
    
      }
    
    
  }
  
