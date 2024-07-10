import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
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

    public notificacionesNoLeidas: any = [];
    public notificacionesLeidas: any = [];

    private socket$: WebSocketSubject<any>;
    
    private ws: string;
    private crud: string;
    private documentoUsuario: string;

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

    // Conexión por WebSocket
    connectWebSocket(docUsuario:string){
        if (!this.ws) {
            console.error('URL del WebSocket no está definida');
            return;
        }

        this.socket$ = new WebSocketSubject(this.ws);

        this.socket$.subscribe(
            (notificacion) => {
                this.numPendientes++;
                this.numPendientesSubject.next(this.numPendientes);
                this.notificaciones.unshift(notificacion);
                this.notificacionesSubject.next(this.notificaciones);
            },
            (err) => console.error(err),
        );

        // Enviar el docuemento de usuario al servidor cuando se establezca la conexión
        this.socket$.next(docUsuario + "wc");
    }

    toogleMenuNotify(): void {
        this.menuActivoSubject.next(true);
    }

    closePanel(): void {
        this.menuActivoSubject.next(false);
    }

    init(ws:string, crud:any, usuario: any): void {
        this.ws = ws;
        this.crud = crud;
        this.documentoUsuario = usuario.userService?.documento;
        if (this.documentoUsuario) {            
            this.connectWebSocket(this.documentoUsuario);
            this.queryNotifications();
        }
    }

    // Actualizar lista de notificaciones
    updateNotifications(): void {
        this.notificaciones = [...this.notificacionesNoLeidas, ...this.notificacionesLeidas];
        this.notificacionesSubject.next(this.notificaciones);
    }

    // Actualizar notificación
    changeStateToView(notificacion: any): void {
        if (!notificacion.lectura) {
            this.numPendientes--;
            this.numPendientesSubject.next(this.numPendientes);
            this.confService.putWithoutPath(`${this.crud}notificacion/${notificacion._id}`, {}).subscribe(
                (res: any) => {
                    if (res && res.Data) {
                        notificacion.lectura = true;  // Cambiar el estado de la notificación a leida

                        // Eliminar notificación de la lista de notificaciones no leidas
                        this.notificacionesNoLeidas = this.notificacionesNoLeidas.filter(
                            (no_leida:any) => no_leida._id !== notificacion._id
                        );

                        // Agregar notificación al inicio de las notificaciones leidas 
                        this.notificacionesLeidas.unshift(notificacion); 

                        // Mantener únicamente 5 notificaciones leidas
                        if (this.notificacionesLeidas.length > 5) {
                            this.notificacionesLeidas.pop();
                        }
                                               
                        this.updateNotifications();
                    }
                }, 
                (error: any) => {console.error(error);}
            )
        }
        this.notificacionSubject.next(notificacion);
    }

    // Consultar listado de notificaciones
    queryNotifications(): void {
        this.loading.next(true);

        if (this.documentoUsuario === "") {
            this.loading.next(false);
            return;
        }

        const query = `notificacion?query=destinatario:${this.documentoUsuario}`;
        const no_leidas = `,lectura:false,&sortby=fecha_creacion&order=desc&limit=0`;
        this.confService.getWithoutPath(`${this.crud}${query + no_leidas}`).subscribe(
            (res: any) => {
                if (res && res.Data) {
                    this.notificacionesNoLeidas = res.Data;
                    this.numPendientes = res.Data.length;
                    const leidas = `,lectura:true,&sortby=fecha_lectura&order=desc&limit=5`;
                    this.confService.getWithoutPath(`${this.crud}${query + leidas}`).subscribe(
                        (res: any) => {
                            if (res && res.Data) {
                                this.notificacionesLeidas = res.Data;
                                this.numPendientesSubject.next(this.numPendientes);
                                this.updateNotifications();
                            }
                        }, (error: any) => {
                            console.error(error);
                            this.loading.next(false);
                        }
                    )
                }
                this.loading.next(false);
            }, (error: any) => {
                console.error(error);
                this.loading.next(false);
            }
        )
    }
}
