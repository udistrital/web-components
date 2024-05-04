import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificacionesService {
    NOTIFICACION_SERVICE = '';
    DEFAULT_NOTIFICACIONES_REVISADAS = 5;

    public notificaciones: any = [];
    private notificacionesSubject = new Subject();
    public notificaciones$ = this.notificacionesSubject.asObservable();

    public numPendientes: number = 0;
    private numPendientesSubject = new BehaviorSubject(0);
    public numPendientes$ = this.numPendientesSubject.asObservable();

    private menuActivoSubject = new BehaviorSubject(false);
    public menuActivo$ = this.menuActivoSubject.asObservable();

    private loading = new BehaviorSubject(false);
    public loading$ = this.loading.asObservable();

    roles: any;
    user: any;
    nombreCola:string;

    constructor(private confService: ConfiguracionService) {
        //Cerrar el panel de notificaciones al hacer clic por fuera de el
        const up$ = fromEvent(document, 'mouseup');
        up$.subscribe((data: any) => {
            if (this.menuActivoSubject) {
                if (((data.path
                    .map((info: any) => info.localName))
                    .filter((data: any) => (data === 'ng-uui-notioas'))).length === 0) {
                    this.closePanel();
                }
            }
        });
    }

    toogleMenuNotify(): void {
        this.menuActivoSubject.next(true);
    }

    closePanel(): void {
        this.menuActivoSubject.next(false);
    }

    init(pathNotificaciones: string, userData: any): void {
        this.NOTIFICACION_SERVICE = pathNotificaciones;
        this.confService.setPath(this.NOTIFICACION_SERVICE);
        if (typeof userData.userService !== 'undefined') {
            this.user = userData.userService;
            this.roles = userData.userService.role ? userData.userService.role : [];
            this.nombreCola = "colaEstados" //Definir el nombre de al cola de acuerdo al rol
            this.queryNotification();
        }
    }

    queryNotification(): void {
        this.loading.next(true)
        // if (this.user.document == "") {
        this.confService.get(`colas/mensajes/usuario?nombre=${this.nombreCola}.fifo&documento=${"usuario1"}`)
            .subscribe(
                (res: any) => {
                    if (res !== null && res.Data !== null) {
                        this.notificaciones = res.Data;
                        this.numPendientes = this.notificaciones.filter(
                            (mensaje:any) => mensaje.Body.MessageAttributes.EstadoMensaje.Value === "pendiente"
                        ).length; 
                        this.numPendientesSubject.next(this.numPendientes);
                        this.notificacionesSubject.next(this.notificaciones);
                        this.loading.next(false)
                    }
                }, (error: any) => {console.log(error)}
            )
    }
}
