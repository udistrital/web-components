import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, Output, OnChanges, OnInit, ViewEncapsulation, EventEmitter, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavItem } from '../interfaces/nav-item';
import { ImplicitAutenticationService } from '../services/implicit_autentication.service';
import { MenuService } from '../services/menu.service';
import { UtilidadesCoreService } from '../services/utilidades-core.service';
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
export class HeaderComponent implements OnChanges {

  private userHomeSubject = new BehaviorSubject('');
  public userHome$ = this.userHomeSubject.asObservable();
  sidebar = false;
  load = true;
  // tslint:disable-next-line: no-input-rename
  appname = '';
  // tslint:disable-next-line: no-output-rename
  @Output('user') user: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-input-rename
  @Input('environment') environment: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private menuService: MenuService,
    private notioasService: NotioasService,
    private utilidadesCoreService: UtilidadesCoreService,
    public menuAplicacionesService: MenuAplicacionesService,
    private autenticacionService: ImplicitAutenticationService,
  ) {
    menuService.sidebar$.subscribe((data) => (this.sidebar = data));
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


  ngOnChanges(changes): void {
    if (changes.environment !== undefined) {
      if (changes.environment.currentValue !== undefined) {
        this.appname = changes.environment.currentValue.appname ? changes.environment.currentValue.appname : '';
        this.utilidadesCoreService.initLib(changes.environment.currentValue);
      }
    }
  }

  ngAfterViewChecked() {
    this.autenticacionService.user$
      .subscribe((data: any) => {
        this.userHomeSubject.next(data.user ? data.user.sub ? data.user.sub : '' : '');
        this.user.emit(data);
      });
    this.cdr.detectChanges();
  }

  logout(): void {
    this.utilidadesCoreService.logout();
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