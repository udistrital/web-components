import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { from, interval, BehaviorSubject, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Respuesta } from '../interfaces/respuesta';

@Injectable({
    providedIn: 'root',
})
export class NotioasService {
    NOTIFICACION_SERVICE = '';
    TIME_PING = 30000;
    public messagesSubject: Subject<any>;

    public listMessage: any;
    private notificacion_estado_usuario: any

    private noNotifySubject = new Subject();
    public noNotify$ = this.noNotifySubject.asObservable();

    private arrayMessagesSubject = new Subject();
    public arrayMessages$ = this.arrayMessagesSubject.asObservable();

    private activo = new BehaviorSubject({});
    public activo$ = this.activo.asObservable();

    timerPing$ = interval(this.TIME_PING);
    roles: any;
    user: any;
    topic: string;
    cola: string;
    public menuActivo: Boolean = false;


    constructor(
        private confService: ConfiguracionService,
    ) {
        this.listMessage = [];
        this.notificacion_estado_usuario = []
        const up$ = fromEvent(document, 'mouseup');
        up$.subscribe((data: any) => {
            if (this.activo) {
                if (((data.path
                    .map((info: any) => { return (info.localName) }))
                    .filter((data: any) => (data === 'ng-uui-notioas'))).length === 0) {
                    this.closePanel();
                }
            }
        });

    }

    toogleMenuNotify() {
        this.menuActivo = !this.menuActivo;
        const data = { activo: this.menuActivo };
        this.activo.next(data);
        if (this.menuActivo) {
            this.changeStateNoView();
        }
    }

    closePanel() {
        this.menuActivo = false;
        this.activo.next({ activo: this.menuActivo });
    }

    /**
     * Inicialización del sistema de notificaciones
     * @param pathNotificacion variable de entorno de Notificaciones
     * @param userData Datos del usuario, incluye lso roles en el campo userData.user.role
     * @param appName Nombre de la aplicación
     */
    init(pathNotificacion: string, userData: any, appName: string) {
        console.info('...Init lib notificaciones');
        this.NOTIFICACION_SERVICE = pathNotificacion;
        this.confService.setPath(this.NOTIFICACION_SERVICE)
        this.confService.get('notificaciones/topic').subscribe({
            next: (response: Respuesta) => {
                if (response.Success) {
                    this.topic = (response.Data as any[]).filter((arn: string) => arn.includes(appName))[0];
                    this.cola = this.topic.replace('sns', 'sqs');
                    const sub = {
                        ArnTopic: this.topic,
                        Endpoint: this.cola
                    };
                    this.confService.post(
                        'notificaciones/suscripcion', sub
                    ).subscribe({
                        next: (response: Respuesta) => {
                            /// TODO
                            // Verificar subscripción a topic, si no está suscrito, suscribir, si ya lo estaba, obtener mensajes
                        }
                    })

                } else {
                    console.info('Notificaciones no disponibles');
                }
            }, error: () => {
                console.info('Notificaciones no disponibles');
            }
        });

            if (typeof userData.user !== 'undefined') {
                this.user = userData.user ? userData.user.email ? userData.user.email.split('@').shift() : '' : '' ;
                this.roles = userData.user.role ? userData.user.role : [];
                this.connect(appName);
                this.queryNotification();
            }
    }

    getNotificaciones() {
        this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length)
        this.arrayMessagesSubject.next(this.listMessage);
    }

    getNotificacionEstadoUsuario(id) {
        return (this.notificacion_estado_usuario.filter(data => data.Id === id))[0];
    }

    send_ping() {
        // sending ping every 30 seconds
        this.timerPing$.subscribe(() => (this.messagesSubject.next('ping')));
    }

    /**
     * Función para suscribirse al sistema de notificaciones cuando el sistema no está suscrito
     * @param app nombre de la aplicación recibido en la función init()
     */
    connect(app: string) {
        console.log('connecting ws ...')
        const id_token = localStorage.getItem('id_token');
        const access_token = localStorage.getItem('access_token');
        if (id_token !== null && access_token !== null) {
            if (this.roles.length > 0) {
                // const connWs = `${this.NOTIFICACION_SERVICE}/join?id=${this.user}&profiles=${this.roles}`;
                const connWs = `${this.NOTIFICACION_SERVICE}/join?id=${access_token}`;
                this.messagesSubject = webSocket({
                    url: connWs,
                    openObserver: {
                        next: () => {
                            this.send_ping();
                        },
                    },
                });
                this.messagesSubject
                    .pipe(
                        map((msn) => {
                            this.listMessage = [...[msn], ...this.listMessage];
                            this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length);
                            this.arrayMessagesSubject.next(this.listMessage);
                            return msn
                        }),
                    )
                    .subscribe(
                        (msg: any) => { },
                        err => {
                            console.info('websocketError:', err);
                        },
                        () => console.info('complete'),
                    );
            }

        }

    }

    close() {
        this.messagesSubject.unsubscribe();
    }

    addMessage(message: any) {
        this.listMessage = [...[message], ...this.listMessage];
        this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length);
        this.arrayMessagesSubject.next(this.listMessage);
    }

    /**
     * Marcar una notificación como ya vista
     */
    changeStateNoView() {
        if (this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada').length >= 1) {
            this.confService.post('notificacion_estado_usuario/changeStateNoView/' + this.user, {})
                .subscribe(res => {
                    this.listMessage = [];
                    this.queryNotification();
                });
        }
    }

    /**
     * Marcar una notificación como ya leída
     * @param id 
     * @param estado 
     */
    changeStateToView(id, estado) {
        if (estado === 'noleida') {
            const notificacion = this.getNotificacionEstadoUsuario(id);
            this.confService.get('notificacion_estado_usuario/changeStateToView/' + notificacion.Id)
                .subscribe(res => {
                    this.listMessage = [];
                    this.queryNotification();
                });
        }
    }

    /**
     * Cargar las notificaciones del sistema y filtrar por DestinatarioId usando el rol del usuario
     * y por dependencia usando los atributos del mensaje
     */
    queryNotification() {
        const id_token = localStorage.getItem('id_token');
        const access_token = localStorage.getItem('access_token');
        if (id_token !== null && access_token !== null) {
            this.confService.get('notificacion_estado_usuario?query=Usuario:' + this.user + ',Activo:true&sortby=notificacion&order=asc&limit=-1')
                .subscribe((resp: any) => {
                    if (resp !== null) {
                        this.notificacion_estado_usuario = resp
                        from(resp)
                            .subscribe((notify: any) => {
                                if (typeof notify.Notificacion !== 'undefined') {
                                    const message = {
                                        Id: notify.Id,
                                        Type: notify.Notificacion.NotificacionConfiguracion.Tipo.Id,
                                        Content: JSON.parse(notify.Notificacion.CuerpoNotificacion),
                                        User: notify.Notificacion.NotificacionConfiguracion.Aplicacion.Nombre,
                                        Alias: notify.Notificacion.NotificacionConfiguracion.Aplicacion.Alias,
                                        EstiloIcono: notify.Notificacion.NotificacionConfiguracion.Aplicacion.EstiloIcono,
                                        FechaCreacion: new Date(notify.Notificacion.FechaCreacion),
                                        FechaEdicion: new Date(notify.Fecha),
                                        Estado: notify.NotificacionEstado.CodigoAbreviacion,
                                    };
                                    this.addMessage(message);
                                }
                            });
                    }

                });
        }

    }

}
