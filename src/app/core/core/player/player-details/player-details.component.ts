import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { PlayDBService } from '../play-db.service';
@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  public pid :string;
  public details = [];

  constructor(private route : ActivatedRoute, private playDBService : PlayDBService) { }

  ngOnInit() {
    this.pid = this.route.snapshot.paramMap.get('id');
    this.getPlayerDetails(this.pid);
  }

  getPlayerDetails(id){
    this.playDBService.getPlayerDetails(id).subscribe((data =>{
      this.details =  data;
      console.log(JSON.stringify(this.details));
    }))
  }

}
