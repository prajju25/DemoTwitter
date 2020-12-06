import { Component } from '@angular/core';
import { LoginServiceService } from './services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private loginService : LoginServiceService) {
    this.loginService.autoLogIn();
  }
}
