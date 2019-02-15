import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { PlayDBService } from './play-db.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public playersList = [];
  data1: any;
  data2: any;
  constructor(private router : Router,
              private playdb : PlayDBService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.playdb.getPlayers().subscribe(data =>{
      console.log(data);
      this.playersList = data;
    })
    
    
  }
  viewPlayer(id) {
    this.router.navigate(['login-information/player-details/'+id]);
  }
}
