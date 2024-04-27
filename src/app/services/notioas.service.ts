import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { fromEvent } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NotioasService {
    NOTIFICACION_SERVICE = '';
    public messagesSubject: Subject<any>;

    public listMessage: any;
    private notificacionEstadoUsuario: any;

    private noNotifySubject = new Subject();
    public noNotify$ = this.noNotifySubject.asObservable();

    private arrayMessagesSubject = new Subject();
    public arrayMessages$ = this.arrayMessagesSubject.asObservable();

    private activo = new BehaviorSubject({});
    public activo$ = this.activo.asObservable();

    private loading = new BehaviorSubject({});
    public loading$ = this.loading.asObservable();

    roles: any;
    user: any;
    nombreCola: string;
    public menuActivo = false;

    constructor(private confService: ConfiguracionService) {
        this.listMessage = [];
        this.notificacionEstadoUsuario = [];

        //Cerrar el panel de notificaciones al hacer clic por fuera de el
        const up$ = fromEvent(document, 'mouseup');
        up$.subscribe((data: any) => {
            if (this.activo) {
                if (((data.path
                    .map((info: any) => info.localName))
                    .filter((data: any) => (data === 'ng-uui-notioas'))).length === 0) {
                    this.closePanel();
                }
            }
        });
    }

    toogleMenuNotify(): void {
        this.menuActivo = !this.menuActivo;
        const data = { activo: this.menuActivo };
        this.activo.next(data);
        if (this.menuActivo) {
            this.changeStateNoView();
        }
    }

    closePanel(): void {
        this.menuActivo = false;
        this.activo.next({ activo: this.menuActivo });
    }

    init(pathNotificacion: string, userData): void {
        console.info('...Init lib notificaciones');
        this.NOTIFICACION_SERVICE = pathNotificacion;
        this.confService.setPath(this.NOTIFICACION_SERVICE);
        if (typeof userData.userService !== 'undefined') {
            this.user = userData.userService;
            this.roles = userData.userService.role ? userData.userService.role : [];
            this.nombreCola = "colaWebComponent.fifo" //Definir el nombre de al cola de acuerdo al rol
            this.removeNotification();
        }
        
    }

    getNotificaciones(): void {
        console.log("getNotificaciones");
        // this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length);
        // this.arrayMessagesSubject.next(this.listMessage);
    }

    getNotificacionEstadoUsuario(id) {
        console.log("getNotificacionEstadoUsuario");
        // return (this.notificacionEstadoUsuario.filter(data => data.Id === id))[0];
    }

    addMessage(message: any): void {
        this.listMessage = [...[message], ...this.listMessage];
        this.noNotifySubject.next(this.listMessage.length);
        this.arrayMessagesSubject.next(this.listMessage);
    }

    changeStateNoView(): void {
        console.log("changeStateNoView");
        // if (this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada').length >= 1) {
        //     this.confService.post('notificacion_estado_usuario/changeStateNoView/' + this.user, {})
        //         .subscribe(res => {
        //             this.listMessage = [];
        //             this.queryNotification();
        //         });
        // }
    }

    changeStateToView(id, estado): void {
        console.log("changeStateToView");
        // if (estado === 'noleida') {
        //     const notificacion = this.getNotificacionEstadoUsuario(id);
        //     this.confService.get('notificacion_estado_usuario/changeStateToView/' + notificacion.Id)
        //         .subscribe(res => {
        //             this.listMessage = [];
        //             this.queryNotification();
        //         });
        // }
    }

    // queryNotification(): void {
    //     this.loading.next({ loading: true })
    //     // if (this.user.document == "") {
    //     this.confService.get(`colas/mensajes/espera?nombre=${this.nombreCola}&tiempoEspera=1&filtro=IdUsuarios:${"usuario1"}`)
    //     .subscribe(
    //         (data: any) => {
    //             if (data !== null && data.Data !== null) {
    //                 let listaNotificaciones = data.Data
    //                 for (let i = 0; i < listaNotificaciones.length; i++) {
    //                     //Guardar la notificación en una lista del componente
    //                     let notificacion = listaNotificaciones[i].Body;
    //                     notificacion.Estado = Math.random() >= 0.5 ? "leida" : "noLeida";
    //                     this.addMessage(notificacion);

    //                     //Eliminar las notificaciones de las colas
    //                     console.log("Empieza a eliminar");
    //                     this.removeNotification()
    //                     console.log("Termina de eliminar");
    //                 }
    //                 console.log("Vuelve a consultar notifiaciones");
    //                 this.queryNotification()
    //                 console.log("Termina de consultar notifiaciones");
    //             }
    //             this.loading.next({ loading: false })
    //         }, (error: any) => {
    //             console.error('Error al consultar notificaciones', error);
    //         }
    //     );
    //     // }
    // }

    removeNotification() {       
        return this.confService.get(`colas/mensajes?nombre=${this.nombreCola}&numMax=10`).pipe(
            concatMap(data1 => {
                this.addMessage(data1.Data[0].Body)
                console.log('Datos 1:', data1);
                return this.confService.post(`colas/mensajes/${this.nombreCola}`, data1.Data[0]);
            })
        ).subscribe(
            datos => {console.log("ya se elimino todo", datos)}, 
            error => {console.log("Error:", error);
            }
        )
    }

    createNotificacion(notification: any) {
        const datos = {
            ArnTopic: notification.TopicArn,
            Asunto: notification.Subject,
            Atributos: {
                IdUsuario: notification.MessageAttributes.IdUsuario.Value,
                Estado: notification.Estado
            },
            DestinatarioId: [ "id"+this.nombreCola ],
            IdDeduplicacion: new Date().getTime().toString(),
            IdGrupoMensaje: notification.MessageAttributes.IdUsuario,
            Mensaje: notification.Message,
            RemitenteId: notification.MessageAttributes.Remitente.Value,
        };
        this.confService.post(`notificaciones/enviar`, datos).subscribe(
            (data: any) => {},
            (error: any) => {
                console.error('Error en la creación de notificacion: ', notification.MessageId);
            }
        );
    }
}
