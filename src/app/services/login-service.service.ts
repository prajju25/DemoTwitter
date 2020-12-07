import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  userData: UserData = null;
  isLoggedIn = new BehaviorSubject(false);
  
  constructor(private http: HttpClient, private router: Router) { }
  
  signup(userReq: any): Observable<any> {
    return this.http
    .post('https://twitter-data-setup-default-rtdb.firebaseio.com/users/'+ userReq.userName +'.json',userReq)
    .pipe(     
      tap(resData => {
        if(resData){
          let userData: UserData = {
            userName: userReq.userName,
            fullName: userReq.fullName,
            createdTime: userReq.createdTime,
            following: userReq.following,
            followers: userReq.followers
          }
          this.saveUserData(userData);
        } else {
          throw new Error("Data provided is invalid");
        }
      })
    );
  }
  login(userData: any): Observable<any> {
    return this.http
      .get('https://twitter-data-setup-default-rtdb.firebaseio.com/users/'+ userData.userName +'.json')
      .pipe(
        tap(resData => {
          const key = Object.keys(resData)[0];
          if(key && resData[key]){
            let userData: UserData = {
              userName: resData[key].userName,
              fullName: resData[key].fullName,
              createdTime: resData[key].createdTime,
              following: resData[key].following,
              followers: resData[key].followers
            }
            this.saveUserData(userData);
          } else {
            throw new Error("Username/Password is invalid");
          }
        })
      );
  }

  saveUserData(resData: any) {
    const user: UserData = resData;
    this.userData = resData;
    localStorage.setItem('userData', JSON.stringify(user));
    this.isLoggedIn.next(true);
  }

  fetchUserData(): UserData{
    if(!this.userData){
      const data = localStorage.getItem('userData');
      this.userData = data ? JSON.parse(data) : null;
    }
    this.isLoggedIn.next(!!this.userData);
    return this.userData;
  }

  logout() {
    this.userData = null;
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    this.isLoggedIn.next(false);
  }

  autoLogIn() {
    this.fetchUserData();
  }

}
