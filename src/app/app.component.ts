import { AfterViewInit, Component } from '@angular/core';
import { environment } from './../../src/environments/environment';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'ng-uui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  opened: boolean = false;
  userData = {user: null, userService: null}
  environment = environment;
  constructor(private menuService: MenuService) {
    this.menuService.sidebar$.subscribe((opened) => (this.opened = opened))
  }

  ngAfterViewInit() {
  }

  userEvent(event) {
    const {user, userService} = event;
    if(userService && user && !this.userData.user && !this.userData.userService){
      this.userData.user = user;
      this.userData.userService = userService;
    }
  }

  optionEvent(event) {
    const {Url} = event;
    if(Url) {
    }
  }

}
