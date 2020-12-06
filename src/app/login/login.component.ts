import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginMode: boolean = true;
  error: string = null;

  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }
    let userData = {
      userName: form.value.userName,
      password: form.value.password
    }

    let loginObs: Observable<any>;

    if (this.isLoginMode) {
      loginObs = this.loginService.login(userData);
    } else {
      userData['fullName'] = form.value.fullName;
      delete userData.password; // temp added for backend call
      
      userData['createdTime'] = new Date().getTime();
      userData['following'] = 0;
      userData['followers'] = 0;
      loginObs = this.loginService.signup(userData);
    }

    loginObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigate(['/home/profile']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

  }

  clearError(){
    this.error = null;
  }

}
