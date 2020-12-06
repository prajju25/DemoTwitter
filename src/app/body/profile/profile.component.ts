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

}
