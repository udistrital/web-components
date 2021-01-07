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
      console.log(data)
      if (JSON.stringify(data) !== '{}') {
        if (data.user) {
          this.isloading = true;
        } else {
          this.isloading = false;
        }
      } else {
        this.isloading = true;
        setTimeout(()=>{this.isloading?this.isloading = false: this.isloading=true }, 2000)
      }
    })
  }

}
