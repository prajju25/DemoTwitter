import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostData } from 'src/app/models/post-data';
import { UserData } from 'src/app/models/user-data';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  myPosts:Array<PostData> = [];
  postKeys: Array<string> = [];
  userData: UserData = null;
  isLoading: boolean = true;
  postMsg: string = null;

  constructor(private apiService: ApiServiceService, private loginService: LoginServiceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userData = this.loginService.fetchUserData();
    this.apiService.fetchPosts().subscribe((res: Array<PostData>)=>{
      this.postKeys = Object.keys(res);
      this.myPosts = res;
      this.isLoading = false;
    });
  }

  postTweet(){
    let userData: UserData = this.loginService.fetchUserData();
    let req: PostData = {
      fullName: userData.fullName,
      likeCount: 0,
      postMsg: this.postMsg,
      postTime: new Date().getTime(),
      retweetCount: 0,
      userName: userData.userName,
      comments: []
    };
    this.apiService.postPosts(req).subscribe((res)=>{
      console.log(res);
      this.myPosts.push(req);
      this.postMsg = null;
      this.apiService.hashtags.next(this.apiService.findHashtags(req.postMsg));
    },
    error=>{
      console.log(error);
    });
  }

}
