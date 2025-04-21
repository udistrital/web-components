import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { ConfiguracionService } from '../services/configuracion.service';
import { ImplicitAutenticationService } from '../services/implicit_autentication.service';
import { MenuService } from '../services/menu.service';
import { MenuAplicacionesService } from '../services/menuAplicaciones.service';
import { NotificacionesService } from '../services/notificaciones.service';
import { catalogo } from './../services/catalogo';

if (!('path' in Event.prototype)) {
  Object.defineProperty(Event.prototype, 'path', {
    get: function () {
      const path = [];
      let currentElem = this.target;
      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1) {
        path.push(document);
      }
      if (path.indexOf(window) === -1) {
        path.push(window);
      }
      return path;
    }
  });
}

@Component({
  selector: 'ng-uui-oas',
  templateUrl: './oas.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./oas.component.scss']
})
export class OasComponent implements OnChanges {
  @Output() user: EventEmitter<any> = new EventEmitter();
  @Output() option: EventEmitter<any> = new EventEmitter();
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() menu: EventEmitter<any> = new EventEmitter();
  @Input() environment: any;

  opened = false;
  isLogin = false;
  userInfo = null;
  userInfoService = null;
  appname: null;
  appMenu: string;
  username: '';
  isloading: boolean;
  notificaciones: false;
  menuApps: false;
  CONFIGURACION_SERVICE: any;
  NOTIFICACION_MID_WS: any;
  NOTIFICACIONES_CRUD: any;
  entorno: any;
  navItems: any;
  constructor(
    private confService: ConfiguracionService,
    private notificacionesService: NotificacionesService,
    private menuAppService: MenuAplicacionesService,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
    private autenticacionService: ImplicitAutenticationService,
  ) {
    this.menuService.sidebar$.subscribe((opened) => (this.opened = opened));
    this.menuService.option$.subscribe((op) => {
      setTimeout(() => (this.option.emit(op)), 100);
    });
    this.menuService.menu$.subscribe((menu) => {
      setTimeout(() => (this.menu.emit(menu)), 100);
    });
    this.autenticacionService.logout$.subscribe((logoutEvent: any) => {
      if (logoutEvent) {
        this.logout.emit(logoutEvent);
      }
    });
    this.autenticacionService.user$.subscribe((data: any) => {
      const isValid = data && data.user && data.userService;
      if (isValid) {
        this.userInfo = data.user;
        this.userInfoService = data.userService;
        this.username = data.user?.email || '';
        this.user.emit(data);
        if (this.notificaciones) {
          this.notificacionesService.init(this.NOTIFICACION_MID_WS, this.NOTIFICACIONES_CRUD, data);
        }
        if (this.menuApps) {
          this.menuAppService.init(catalogo[this.entorno], data);
        }
        this.isLogin = true;
        this.isloading = true;
      }
    });


  }
  title = 'app-client';

  async ngOnChanges(changes): Promise<void> {

    if (changes.environment?.currentValue) {
      const {
        CONFIGURACION_SERVICE,
        NOTIFICACION_MID_WS,
        NOTIFICACIONES_CRUD,
        entorno,
        notificaciones,
        menuApps,
        appMenu,
        navItems,
        appname,
        autenticacion,
        TOKEN
      } = changes.environment.currentValue;

      this.appMenu = appMenu;
      this.navItems = navItems;
      this.appname = appname;
      this.notificaciones = notificaciones;
      this.menuApps = menuApps;
      this.entorno = entorno;
      this.CONFIGURACION_SERVICE = CONFIGURACION_SERVICE;
      this.NOTIFICACION_MID_WS = NOTIFICACION_MID_WS;
      this.NOTIFICACIONES_CRUD = NOTIFICACIONES_CRUD;

      this.confService.setPath(CONFIGURACION_SERVICE);

      if (autenticacion) {
        this.isloading = true;
        try {
          await this.autenticacionService.init(TOKEN);
        } catch (err) {
          this.isloading = false;
        }
      }
    }
  }

  loginEvent(): void {
    this.autenticacionService.getAuthorizationUrl();
  }

  logoutEvent(): void {
    this.autenticacionService.logout('action-event');
  }

  ngOnInit() {

  }

}
