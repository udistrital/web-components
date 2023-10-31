import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ng-uui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  @Input() appname: any;
  basePathAssets = 'https://pruebasassets.portaloas.udistrital.edu.co/';
  @Input() isloading = false;
  @Output() loginEvent: EventEmitter<any> = new EventEmitter();

  login(): void {
    this.isloading = true;
    this.loginEvent.next('clicked');
  }
  ngOnInit(): void {
  }

}
