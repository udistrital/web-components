import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// services
import { ConfiguracionService } from './services/configuracion.service';
import { NotioasService } from './services/notioas.service';
import { MenuAplicacionesService } from './services/menuAplicaciones.service';
import { MenuService } from './services/menu.service'

// local Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuAplicacionesComponent } from './menu-aplicaciones/menu-aplicaciones.component';
import { NotioasComponent } from './notioas/notioas.component';
import { LoadComponent } from './load/load.component';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';

// material modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { OasComponent } from './oas/oas.component';
import { TercerosFormComponent } from './terceros-form/terceros-form.component';

// end material modules
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuAplicacionesComponent,
    NotioasComponent,
    LoadComponent,
    MenuComponent,
    SidebarComponent,
    LoginComponent,
    OasComponent,
    TercerosFormComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    //material modules
    MatListModule,
    MatIconModule,
    // end material modules
  ],
  entryComponents: [],
  providers: [
    ConfiguracionService,
    NotioasService,
    MenuAplicacionesService,
    MenuService,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private injector: Injector
  ) {
  }
  ngDoBootstrap() { }
}
