import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
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
  // tslint:disable-next-line: no-input-rename
  @Input('appname') appname: any;
  // tslint:disable-next-line: no-input-rename
  @Input('environment') environment: any;
  constructor(
    private notioasService: NotioasService,
    private utilidadesCoreService: UtilidadesCoreService,
    private menuAplicacionesService: MenuAplicacionesService,
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
  }

  ngOnChanges(changes): void {
    if (changes.environment !== undefined) {
      if (changes.environment.currentValue !== undefined) {
        console.log(changes);
        this.utilidadesCoreService.initLib(changes.environment.currentValue);
      }
    }
  }

  logout() {
    // token_service.logout();
  }

  toogleCerrarSesion() {
    const buttonCerrarSesion = document.getElementById('header-button-cerrarsesion-container');
    if (buttonCerrarSesion.style.display === 'none' || buttonCerrarSesion.style.display === '') {
      buttonCerrarSesion.style.display = 'block';
    } else {
      buttonCerrarSesion.style.display = 'none';
    }
  }

  toogleAplicaciones() {
    this.menuAplicacionesService.toogleMenuNotify();
  }

  togglenotify() {
    this.notioasService.toogleMenuNotify();

    // if (!behaviorTheme.notificacion.open) {
    //   notificacion.changeStateNoView();
    // }
    // behaviorTheme.toogleNotificacion();
  }

  sidebarEvent() {
    // behaviorTheme.toogleSidebar();
  }

}

// if (token_service.live_token()) {
//   isLogin = true;
//   notificacion = notificacion;
//   token = token_service.getPayload();
// } else {
//   isLogin = false;
// }

// sidebarClases = behaviorTheme.sidebar;


// var mediaquery = window.matchMedia('(max-width: 855px)');
// if (mediaquery.matches) {
//   behaviorTheme.toogleSidebar();
//   behaviorTheme.toogleSidebar();
// }