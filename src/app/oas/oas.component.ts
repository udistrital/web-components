import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { ConfiguracionService } from '../services/configuracion.service';
import { ImplicitAutenticationService } from '../services/implicit_autentication.service';
import { MenuService } from '../services/menu.service';
import { MenuAplicacionesService } from '../services/menuAplicaciones.service';
import { NotioasService } from '../services/notioas.service';
import { catalogo } from './../services/catalogo';

if (!("path" in Event.prototype))
  Object.defineProperty(Event.prototype, "path", {
    get: function () {
      var path = [];
      var currentElem = this.target;
      while (currentElem) {
        path.push(currentElem);
        currentElem = currentElem.parentElement;
      }
      if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
        path.push(document);
      if (path.indexOf(window) === -1)
        path.push(window);
      return path;
    }
  });


@Component({
  selector: 'ng-uui-oas',
  templateUrl: './oas.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./oas.component.scss']
})
export class OasComponent implements OnChanges {
  @Output('user') user: EventEmitter<any> = new EventEmitter();
  @Output('option') option: EventEmitter<any> = new EventEmitter();
  @Output('logout') logout: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-input-rename
  @Input('environment') environment: any;
  opened: boolean = false;
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
  NOTIFICACION_SERVICE: any;
  entorno: any;
  navItems: any;
  constructor(
    private confService: ConfiguracionService,
    private notioasService: NotioasService,
    private menuAppService: MenuAplicacionesService,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
    private autenticacionService: ImplicitAutenticationService,
  ) {
    this.menuService.sidebar$.subscribe((opened) => (this.opened = opened));
    this.menuService.option$.subscribe((op) => {
      setTimeout(() => (this.option.emit(op)), 100)
    });
    this.autenticacionService.logout$.subscribe((logoutEvent: any) => {
      if(logoutEvent) {
        this.logout.emit(logoutEvent);
      }
    })
    this.autenticacionService.user$.subscribe((data: any) => {
      const isValid = data && data.user && data.userService;
      if (isValid) {
        this.userInfo = data.user;
        this.userInfoService = data.userService;
        this.username = data.user?.email || '';
        this.user.emit(data);
        if (this.notificaciones) {
          this.notioasService.init(this.NOTIFICACION_SERVICE, data);
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
        NOTIFICACION_SERVICE,
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
      this.NOTIFICACION_SERVICE = NOTIFICACION_SERVICE;


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

  loginEvent() {
    this.autenticacionService.getAuthorizationUrl();
  }

  logoutEvent() {
    this.autenticacionService.logout('action-event');
  }

  ngOnInit() {

  }

}
