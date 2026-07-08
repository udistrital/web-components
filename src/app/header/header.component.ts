import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewEncapsulation, ChangeDetectorRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { fromEvent } from 'rxjs';
import { MenuService } from '../services/menu.service';
import { MenuAplicacionesService } from './../services/menuAplicaciones.service';
import { NotificacionesService } from './../services/notificaciones.service';

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
      transition('* => *', animate('300ms ease-in'))
    ]),
    trigger('logoAnimation', [
      state(
        VisibilityState.Hidden,
        style({ transform: 'scaleX(0) translate(-150%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ transform: 'scaleX(1)  translate(-28%)' })
      ),
      transition('* => *', animate('300ms ease-in'))
    ]),
    trigger('iconMenu', [
      state(
        VisibilityState.Hidden,
        style({ transform: 'translate(3em, 0)' })
      ),
      state(
        VisibilityState.Visible,
        style({ transform: 'translate(0em, 0)' })
      ),
      transition('* => *', animate('300ms ease-in'))
    ]),
  ]
})
export class HeaderComponent implements OnChanges {
  @Input() appname: any;
  @Input() username: any;
  @Input() notificaciones: any;
  @Input() menuApps: any;
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();

  menuActivo: boolean;
  numPendientes: number;
  sidebar = false;
  load = true;
  cerrarSesion = false;
  basePathAssets = 'https://pruebasassets.portaloas.udistrital.edu.co/';

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

  constructor(
    private cdr: ChangeDetectorRef,
    private menuService: MenuService,
    private notificacionesService: NotificacionesService,
    public menuAplicacionesService: MenuAplicacionesService,
  ) {
    menuService.sidebar$.subscribe((data) => (this.sidebar = data));
  }

  ngOnInit() {
    const up$ = fromEvent(document, 'mouseup');
    up$.subscribe((data: any) => {
      if (this.cerrarSesion) {
        if (((data.path
          .map((info: any) => info.localName))
          .filter((data: any) => (data === 'header-button-cerrarsesion-container'))).length === 0) {
          this.toogleCerrarSesion();
        }
      }
    });

    this.subscribeToMenuActivo();
    this.subscribeToNumPendientes();
  }

  private subscribeToMenuActivo(): void {
    this.notificacionesService.menuActivo$.subscribe((menuActivo: boolean) => {
      this.menuActivo = menuActivo;
    });
  }

  private subscribeToNumPendientes(): void {
    this.notificacionesService.numPendientes$.subscribe((numPendientes: number) => {
      this.numPendientes = numPendientes;
    });
  }

  logout(): void {
    this.logoutEvent.next('clicked');
  }

  ngOnChanges(changes): void {
    if (changes.appname !== undefined) {
      if (changes.appname.currentValue !== undefined) {
        this.appname = changes.appname.currentValue;
      }
    }
  }

  toogleCerrarSesion(): void {
    const buttonCerrarSesion = document.getElementById('header-button-cerrarsesion-container');
    if (buttonCerrarSesion.style.display === 'none' || buttonCerrarSesion.style.display === '') {
      this.cerrarSesion = true;
      buttonCerrarSesion.style.display = 'block';
    } else {
      this.cerrarSesion = false;
      buttonCerrarSesion.style.display = 'none';
    }
  }

  toogleAplicaciones(): void {
    this.menuAplicacionesService.toogleMenuNotify();
  }

  togglenotify(): void {
    this.notificacionesService.toogleMenuNotify();
  }

  openSidebar(): void {
    this.menuService.openNav();
  }

  closeSidebar(): void {
    this.menuService.closeNav();
  }
}
