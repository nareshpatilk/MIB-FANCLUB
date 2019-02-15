import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
// import { Message } from '../model/message';
// import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';
import { Message } from "src/app/core/model/message";

const SERVER_URL = 'http://localhost:3001';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
}

public send(message: string): void {
    
    this.socket.emit('chat', message);
    
} 
public joinchat(email: string): void{
    this.socket.emit('join',{email:email});
}
public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('chat', (data: any) =>{observer.next(data)});
    });
}
//not req
public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event, () => observer.next());
    });
}
}
