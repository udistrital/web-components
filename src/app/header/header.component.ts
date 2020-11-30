import { Component, Input, Output, OnChanges, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImplicitAutenticationService } from '../services/implicit_autentication.service';
import { UtilidadesCoreService } from '../services/utilidades-core.service';
import { MenuAplicacionesService } from './../services/menuAplicaciones.service';
import { NotioasService } from './../services/notioas.service';
@Component({
  selector: 'ng-uui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit, OnChanges {
  userHome = '';
  // tslint:disable-next-line: no-input-rename
  @Input('appname') appname: any;
  // tslint:disable-next-line: no-output-rename
  @Output('user') user: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-input-rename
  @Input('environment') environment: any;
  constructor(
    private notioasService: NotioasService,
    private utilidadesCoreService: UtilidadesCoreService,
    private menuAplicacionesService: MenuAplicacionesService,
    private autenticacionService: ImplicitAutenticationService,
  ) { }

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

  ngOnInit(): void {
    this.autenticacionService.user$
      .subscribe((data: any) => {
        this.userHome = data.user ? data.user.sub ? data.user.sub : '' : '';
        console.log('homeUser', data);
      });
  }

  ngOnChanges(changes): void {
    if (changes.environment !== undefined) {
      if (changes.environment.currentValue !== undefined) {
        this.utilidadesCoreService.initLib(changes.environment.currentValue);
      }
    }
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

  sidebarEvent(): void {
  }


}