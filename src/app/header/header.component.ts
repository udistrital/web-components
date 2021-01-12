import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewEncapsulation, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuAplicacionesService } from './../services/menuAplicaciones.service';
import { NotioasService } from './../services/notioas.service';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}
@Component({
  selector: 'ng-uui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('iconAnimation', [
      state(
        VisibilityState.Hidden,
        style({ transform: 'scaleX(0) translate(-150%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ transform: 'scaleX(1) translate(0%' })
      ),
      transition('* => *', animate('400ms ease-in'))
    ]),
    trigger('logoAnimation', [
      state(
        VisibilityState.Hidden,
        style({ transform: 'scaleX(0) translate(-150%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ transform: 'scaleX(1)  translate(-40%)' })
      ),
      transition('* => *', animate('400ms ease-in'))
    ])
  ]
})
export class HeaderComponent {
  sidebar = false;
  load = true;
  @Input('appname') appname: any;
  @Input('username') username: any;
  @Output('logoutEvent') logoutEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private cdr: ChangeDetectorRef,
    private menuService: MenuService,
    private notioasService: NotioasService,
    public menuAplicacionesService: MenuAplicacionesService,
  ) {
    menuService.sidebar$.subscribe((data) => (this.sidebar = data));
  }

  ngOnInit() {
  }

  sidebarClases = {
    open: false,
    sidebarDivClase: 'sidebar_off',
    sidebarContainerClase: 'main-container-sidebar-off',
    containerDivClase: 'container-view',
    containerBodyClase: 'container-body',
    containerLogoCollapsedClase: 'inline-block',
    containerLogoClase: 'none',
    textoMenuLateralClase: 'menulateral-text'
  };

  notificacion = {
    open: false,
    clase: 'notificacion_container'
  };

  logout(): void {
    this.logoutEvent.next('clicked')
  }

  toogleCerrarSesion(): void {
    const buttonCerrarSesion = document.getElementById('header-button-cerrarsesion-container');
    if (buttonCerrarSesion.style.display === 'none' || buttonCerrarSesion.style.display === '') {
      buttonCerrarSesion.style.display = 'block';
    } else {
      buttonCerrarSesion.style.display = 'none';
    }
  }

  toogleAplicaciones(): void {
    this.menuAplicacionesService.toogleMenuNotify();
  }

  togglenotify(): void {
    this.notioasService.toogleMenuNotify();
  }

  openSidebar(): void {
    this.menuService.openNav();
  }

  closeSidebar(): void {
    this.menuService.closeNav();
  }

}