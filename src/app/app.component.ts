import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from './../../src/environments/environment';
import { NavItem } from './interfaces/nav-item';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'ng-uui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  opened: boolean = false;
  userData = {user: null, userService: null}
  constructor(private menuService: MenuService) {
    this.menuService.sidebar$.subscribe((opened) => (this.opened = opened))
  }

  environment = environment;

  ngAfterViewInit() {
  }

  userEvent(event) {
    const {user, userService} = event;
    if(userService && user && !this.userData.user && !this.userData.userService){
      this.userData.user = user;
      this.userData.userService = userService;
      console.log(this.userData);
    }
  }

  optionEvent(event) {
    const {Url} = event;
    if(Url) {
      console.log(Url);
    }
  }

}
