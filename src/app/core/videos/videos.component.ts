import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VideofetchService } from 'src/app/core/service/videofetch.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  public videoList;
  public videosComments;
  public videosUserComments;
  public videoData;
  redis_Like = 0;
  redis_UnLike = 0;

 intial_like = 10;
 intial_dislike = 20;
 dataByuserLike: boolean = false;
 dataByuserUnLike:boolean = false;
 public safeURL;
  videoURL = 'https://www.youtube.com/embed/';
  comment = '';
 selectedVideoId = '';

// like dislike
 clickFgL = false;
 clickFgD = false;
 sendToBackEndLKDK = false;
 currentVideoID='';//video id

  constructor(private videofectservice: VideofetchService,
              private router : Router,
              private route : ActivatedRoute,
              private sessionService: SessionService,
              private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getAllVideos();
  }

  getAllVideos(){
    this.videofectservice.getVideos().subscribe(data => {
      console.log(data);
      this.videoList = data;
    });
  }

  playVideos(id){
  	this.selectedVideoId = id;
		
		this.getComment(this.selectedVideoId);
		
		this.triggerLD(id);
		//this.getVideoDetails(this.selectedVideoId);

		var selectedVideo = this.videoList.data.filter(
			videos => videos._id === id);
		let videoId = selectedVideo[0].videoYtID;

		this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(`${this.videoURL}${videoId}?controls=1`); 
  }
  
  getComment(id){
		// //Get comments
		this.currentVideoID = id;
			this.videofectservice.getVideoComments(id).subscribe(data => { 
			//this.videosComments = JSON.parse(JSON.stringify(data.data));
			//this.videosUserComments = this.videosComments.user;
			this.videosComments = data.videosComments;
		
			this.videosUserComments = data.videosComments.user;
		})
	}

	getVideoDetails(id){
		//Get comments
		this.dataByuserLike = false;
		this.dataByuserUnLike = false;
		var ComObj = {'videoID' : id,'userID' : this.sessionService.getValueFromSession("_id") };
		// this.videofectservice.getVideoDetails(ComObj).subscribe(data => {
		// 	this.videoData = data.videoData;
		// 	this.redis_UnLike = this.videoData.redis_UnLike;
		// 	this.redis_Like = this.videoData.redis_Like;
		// 	if(this.videoData.videosLikes[0].likes)
		// 	{
		// 		this.dataByuserLike = true;
		// 		this.dataByuserUnLike = false;
		// 	}
		// 	else{
		// 		this.dataByuserUnLike = true;
		// 		this.dataByuserLike = false;
		// 	}
		// })
  }
  
  OnComment(){
		if(this.comment=="")
		{	alert("Please enter comment!!!");	}
		else if(this.sessionService.getValueFromSession("isLoggedIn"))
		{
			var updatedComment = this.sessionService.getValueFromSession("_rXr")+" : "+this.comment;
			
			var commObject = {'videoId':this.selectedVideoId,'userId':this.sessionService.getValueFromSession("_iXd"),'comments':this.comment,'userName':this.sessionService.getValueFromSession("_rXr")};
			this.videofectservice.postVideosComments(commObject,this.sessionService.getValueFromSession("_XTX")).subscribe(res => {
				let returneddata: any = res;
				this.comment = "";	
				this.getComment(this.selectedVideoId);			
			},
			err => {
				//console.log("err : "+JSON.stringify(err));

				if(err.name.indexOf('TokenExpiredError')>0 )
				{
					this.sessionService.clearSession();
					//this.sessionService.LoggedInUserDetails.emit(new User(this.sessionService.getValueFromSession('_t'), this.sessionService.getValueFromSession('_r'),this.sessionService.getValueFromSession('isLoggedIn'),this.sessionService.getValueFromSession('_f')));
					alert("Session expired. Please login!!! ");
					this.router.navigate(['login-information/login']);
				}
			})
		}
		else{
			alert("Please Login!!!");
			this.comment = "";	
		}
	}

	OnLikeDislike(){
		if(this.sessionService.getValueFromSession("isLoggedIn"))
		{
			var commObject = {'videoID':this.selectedVideoId,'userID':this.sessionService.getValueFromSession("_iXd"),'likes':'1'};
			this.videofectservice.postVideosLikes(commObject,this.sessionService.getValueFromSession("_XTX")).subscribe(res => {
				let returneddata: any = res;
				this.comment = "";	
			//	this.getVideoDetails(this.selectedVideoId);			
			},
			err => {
				// if(err.error.indexOf('jwt expired')>0 )
				// {
				// 	this.sessionService.clearSession();
					
				// 	alert("Session expired. Please login!!! ");
				// 	this.router.navigate(['login-information/login']);
				// }
			})
		}
		else{
			alert("Please Login!!!");	
		}
	}
	
	OnLk(){
		//button toggle
		if(this.sessionService.getValueFromSession('isLoggedIn')){
		this.dataByuserLike  = true;
		this.dataByuserUnLike = false;

		this.intial_like = this.intial_like + 1;
		this.clickFgL = true;
		if(this.intial_dislike != 0 && this.clickFgD)
			this.intial_dislike = this.intial_dislike - 1;

		this.sendToBackEndLKDK = true;
		this.updateLikeDislikefun();
	}else{
		alert("please Login to Like!");
	}
	}
	OnDk(){
		if(this.sessionService.getValueFromSession('isLoggedIn')){
		this.clickFgD = true;

		this.dataByuserLike  = false;
		this.dataByuserUnLike = true;
		this.intial_dislike = this.intial_dislike + 1;

		if(this.intial_like != 0 && this.clickFgL)
			this.intial_like = this.intial_like - 1;

		this.sendToBackEndLKDK = true;
		this.updateLikeDislikefun();
	}else{
		alert("please Login to DisLike!");
	}
	}

	updateLikeDislikefun () {

		let likeVal = this.intial_like;
		let dislikeVal = this.intial_dislike
		let videoId = this.currentVideoID;
		let userID = this.sessionService.getValueFromSession('_iXd');
		let contentVal: any = {
			videoID : this.currentVideoID,
			userID : this.sessionService.getValueFromSession('_iXd'),
			dislikeVal : this.intial_dislike,
			likeVal : this.intial_like,
			
		}
		this.videofectservice.postVideosLikes(contentVal,
																					this.sessionService.getValueFromSession('_XTX'))
																	.subscribe();
	}
	
	triggerLD(id){
	let t = { id: id};
		this.videofectservice.getLDval(t).subscribe(data => {
			let initalData = JSON.parse(JSON.stringify(data.data));
			this.intial_like = initalData.likes;
			this.intial_dislike = initalData.disLikes;
			//alert('L>'+initalData.likes );
		//	alert('D>'+initalData.disLikes );
		})
	}
}
