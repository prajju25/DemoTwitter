import { Component, OnInit } from '@angular/core';
import { PostData } from 'src/app/models/post-data';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Array<PostData> = [];
  postKeys: Array<String> = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiServiceService, private loginService: LoginServiceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.fetchPosts().subscribe((res: Array<PostData>)=>{
      this.postKeys = Object.keys(res);
      this.posts = res;
      this.isLoading = false;
    });
  }

}
