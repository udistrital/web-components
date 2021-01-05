import { Component, OnInit } from '@angular/core';
import { ImplicitAutenticationService } from '../services/implicit_autentication.service';

@Component({
  selector: 'ng-uui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private autenticacionService: ImplicitAutenticationService) { }
  isloading = false;
  login() {
    this.autenticacionService.getAuthorizationUrl();
  }

  ngOnInit(): void {
    this.autenticacionService.user$.subscribe((data: any) => {
      if (JSON.stringify(data) !== '{}') {
        if (data.user) {
          console.log('asdf')
          this.isloading = true;
        } else {
          console.log('asdfasdfasdf')
          this.isloading = false;
        }
      } else {
        console.log('ayyy')
        this.isloading = false;
      }
    })
  }

}
