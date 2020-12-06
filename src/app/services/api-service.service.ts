import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostData } from '../models/post-data';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type':  'application/json',
  });
  hashtags = new Subject();
  constructor(private http: HttpClient) { }
  
  fetchPosts(): Observable<Object> {
    let httpOptions = {
      headers: this.httpHeaders,
      //params: new HttpParams().set('orderBy','postTime')
    }
    return this.http.get('https://twitter-data-setup-default-rtdb.firebaseio.com/posts.json',httpOptions)
    .pipe(tap((res)=>{
      this.hashtags.next(undefined);
      Object.keys(res).map((key)=>{        
        this.hashtags.next(this.findHashtags((res[key] as PostData).postMsg));
      });
      return res;
    }));
  }

  postPosts(postReq): Observable<Object> {
    let httpOptions = {
      headers: this.httpHeaders,
      //params: new HttpParams().set('orderBy','postTime')
    }
    return this.http.post('https://twitter-data-setup-default-rtdb.firebaseio.com/posts.json', postReq, httpOptions);
  }

  findHashtags(searchText) {
    let regexp = /(\s|^)\#\w\w+\b/gm
    let result = searchText.match(regexp);
    if (result) {
      result = result.map(function(s){ return s.trim();});
      return result;
    } else {
        return false;
    }
  }
}
