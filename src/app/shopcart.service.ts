import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShopcartService {

  triggerLoginButtonHide1 = new EventEmitter<any>();
  constructor() { }
}
