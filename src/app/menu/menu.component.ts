import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavItem } from './../interfaces/nav-item';
import { MenuService } from '../services/menu.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'ng-uui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuComponent{
  expanded = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(public navService: MenuService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: NavItem): void {
    if (!item.Opciones || !item.Opciones.length) {
      this.navService.updateOption(item);
      this.navService.closeNav();
    }
    if (item.Opciones && item.Opciones.length) {
      this.expanded = !this.expanded;
    }
  }
}
