import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

  hashTags: Array<{name: string, count: number}> = [];
  tempHashTags: Array<{name: string, count: number}> = [];
  searchString: string = null;
  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.hashtags.subscribe((res: any)=>{
      if(Array.isArray(res)){
        res.forEach((val)=> {
          this.addHashTags(val);
        });
      } else if(typeof(res) === 'string' ) {
        this.addHashTags(res);
      } else if(res == undefined) {
        this.tempHashTags = [];
      }
      this.hashTags = this.tempHashTags;
      this.sortHashTags();
    });
  }

  addHashTags(hashTag){
    let isAdded = false;
    if(this.tempHashTags.length > 0){
      isAdded = this.tempHashTags.some((res)=>{
        if(res.name == hashTag){
          res.count++;
          return true;
        }
        return false;
      });
    }
    if(!isAdded) {
      this.tempHashTags.push({
        name: hashTag,
        count: 1
      });
    }
  }

  sortHashTags(){
    if(this.hashTags.length > 1){
      this.hashTags.sort((val1,val2)=>{
        return val2.count - val1.count;
      });
    }
  }

  search(){
    if(this.searchString.length > 1){
      this.hashTags = this.tempHashTags.filter((val)=>{
        return val.name.includes('#'+this.searchString)
      })
    }
    this.sortHashTags();
  }

}
