import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { NotioasService } from './notioas.service';
import { catalogo } from './catalogo';
import { MenuAplicacionesService } from './menuAplicaciones.service';
import { ImplicitAutenticationService } from './implicit_autentication.service';

@Injectable({
    providedIn: 'root',
})
export class UtilidadesCoreService {
    constructor(
        private confService: ConfiguracionService,
        private notioasService: NotioasService,
        private menuService: MenuAplicacionesService,
        private autenticacionService: ImplicitAutenticationService
    ) {
    }
    initLib({ CONFIGURACION_SERVICE, NOTIFICACION_SERVICE, entorno, notificaciones, menuApps, autenticacion, TOKEN }): void {
        this.confService.setPath(CONFIGURACION_SERVICE);
        if (autenticacion) {
            this.autenticacionService.init(TOKEN);
            if (this.autenticacionService.login(false)) {
                this.autenticacionService.live();
            }
        }

        this.autenticacionService.user$
            .subscribe((response: any) => {
                if (JSON.stringify(response) !== '{}') {
                    const accessToken = localStorage.getItem('access_token');
                    if (accessToken !== null && typeof response.user !== 'undefined') {
                        if (notificaciones) {
                            this.notioasService.init(NOTIFICACION_SERVICE);
                        }
                        if (menuApps) {
                            this.menuService.init(catalogo[entorno]);
                        }
                    }
                }
            });
    }

    logout(): void {
        this.autenticacionService.logout();
    }

}
