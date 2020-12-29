import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavItem } from '../interfaces/nav-item';
import { ConfiguracionService } from '../services/configuracion.service';
import { ImplicitAutenticationService } from '../services/implicit_autentication.service';
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
    private menuService: MenuService,
    private configuracionService: ConfiguracionService,
    private userService: ImplicitAutenticationService
      ){

  }
  ngOnInit(): void {
    this.menuService.sidebar$.subscribe((opened)=>(this.sidebarAnimation = opened?VisibilityState.Visible:VisibilityState.Hidden));
    this.userService.user$.subscribe((user: any)=>{ 
      if(user) {
        const role = user.user?user.user.role?user.user.role.filter((menu)=>(menu!== 'Internal/everyone')).join(','):"":"";
        if(role !== '') {
          this.configuracionService.getMenu(role,environment.appMenu, 'menu_opcion_padre/ArbolMenus')
          .subscribe((data)=> {
            this.navItems = data;
            this.navItems = [...[{
              Nombre: 'Inicio',
              Icono: 'home',
              Url: 'pages',
              Opciones: []}]
              ,...this.navItems]
          })
        }
      }
    })
  }

}
