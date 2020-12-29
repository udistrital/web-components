import { Component, OnInit } from '@angular/core';
import { ImplicitAutenticationService } from '../services/implicit_autentication.service';

@Component({
  selector: 'ng-uui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private autenticacionService: ImplicitAutenticationService) { }

  login() {
    console.log('login');
    this.autenticacionService.live();
  }

  ngOnInit(): void {
  }

}
