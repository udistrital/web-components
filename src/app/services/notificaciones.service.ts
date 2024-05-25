import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificacionesService {
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

    private notificacionSubject = new BehaviorSubject(false);
    public notificacion$ = this.notificacionSubject.asObservable();

    docUsuario: any;
    cola:string;
    path: string;

    constructor(private confService: ConfiguracionService) {
        // Cerrar el panel de notificaciones al hacer clic por fuera de el
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

    init(path:string, colas: any, usuario: any, entorno: string): void {
        this.path = path;
        const userService = usuario.userService
        if (userService) {            
            this.docUsuario = userService.documento;
            let roles = userService.role;
            
            // Obtener el nombre de la cola a partir del rol y dependiendo del entorno
            let rol = Object.keys(colas).find((rol) => roles.includes(rol)) ?? null;            
            if (rol) {
                this.cola = entorno == 'test' ? `cola${colas[rol]}` : colas[rol];
                this.queryNotifications();
            }
        }
    }

    changeStateToView(notificacion: any): void {
        let cuerpoMensaje = notificacion.Body
        if (cuerpoMensaje.MessageAttributes.EstadoMensaje.Value == "pendiente") {
            this.numPendientesSubject.next(0);
            this.queryNotifications(cuerpoMensaje.MessageId) // Cambiar estado a revisado
        }
        this.notificacionSubject.next(notificacion)
    }

    queryNotifications(id: string = ''): void {
        this.loading.next(true)

        if (this.docUsuario === "") {
            this.loading.next(false);
            return;
        }

        const endpoint = `colas/mensajes/usuario?nombre=${this.cola}.fifo&usuario=${this.docUsuario}`;
        const url = id ? `${endpoint}&idMensaje=${id}` : endpoint;
        this.confService.getWithoutPath(`${this.path}${url}`).subscribe(
            (res: any) => {
                if (res && res.Data) {
                    this.notificaciones = res.Data;
                    this.numPendientes = this.notificaciones.filter(
                        (mensaje:any) => mensaje.Body.MessageAttributes.EstadoMensaje.Value === "pendiente"
                    ).length; 
                    this.numPendientesSubject.next(this.numPendientes);
                    this.notificacionesSubject.next(this.notificaciones);
                }
                this.loading.next(false)
            }, (error: any) => {
                console.log(error);
                this.loading.next(false);
            }
        )
    }
}
