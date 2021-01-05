import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { NavItem } from '../interfaces/nav-item';
import { MenuService } from '../services/menu.service';
enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

@Component({
  selector: 'ng-uui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sidebarAnimation', [
      state(
        VisibilityState.Hidden,
        style({ transform: 'scaleX(0.5) translate(-200%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ transform: 'scaleX(1) translate(-0.1%)' })
      ),
      transition('* => *', animate('400ms ease-in'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  sidebarAnimation: VisibilityState;
  @Input() navItems: NavItem[];

  constructor(
    public menuService: MenuService,
  ) {

  }
  ngOnInit(): void {
    this.menuService.sidebar$.subscribe((opened) =>
      (this.sidebarAnimation = opened ? VisibilityState.Visible : VisibilityState.Hidden));
    this.menuService.getMenu();
    this.menuService.menu$.subscribe((data: NavItem[]) => {
      this.navItems = data;
    })
  }

}
