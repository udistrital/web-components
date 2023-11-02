import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { from, interval, BehaviorSubject, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotioasService {
    NOTIFICACION_SERVICE = '';
    TIME_PING = 30000;
    public messagesSubject: Subject<any>;

    public listMessage: any;
    private notificacionEstadoUsuario: any;

    private noNotifySubject = new Subject();
    public noNotify$ = this.noNotifySubject.asObservable();

    private arrayMessagesSubject = new Subject();
    public arrayMessages$ = this.arrayMessagesSubject.asObservable();

    private activo = new BehaviorSubject({});
    public activo$ = this.activo.asObservable();

    timerPing$ = interval(this.TIME_PING);
    roles: any;
    user: any;
    public menuActivo = false;

    constructor(
        private confService: ConfiguracionService,
    ) {
        this.listMessage = [];
        this.notificacionEstadoUsuario = [];
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
        if (typeof userData.user !== 'undefined') {
            this.user = userData.user ? userData.user.email ? userData.user.email.split('@').shift() : '' : '';
            this.roles = userData.user.role ? userData.user.role : [];
            this.connect();
            this.queryNotification();
        }
    }

    getNotificaciones(): void {
        this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length);
        this.arrayMessagesSubject.next(this.listMessage);
    }

    getNotificacionEstadoUsuario(id) {
        return (this.notificacionEstadoUsuario.filter(data => data.Id === id))[0];
    }

    send_ping(): void {
        // sending ping every 30 seconds
        this.timerPing$.subscribe(() => (this.messagesSubject.next('ping')));
    }

    connect(): void {
        console.log('connecting ws ...');
        const idToken = localStorage.getItem('id_token');
        const accessToken = localStorage.getItem('access_token');
        if (idToken !== null && accessToken !== null) {
            if (this.roles.length > 0) {
                // const connWs = `${this.NOTIFICACION_SERVICE}/join?id=${this.user}&profiles=${this.roles}`;
                const connWs = `${this.NOTIFICACION_SERVICE}/join?id=${accessToken}`;
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
                            return msn;
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

    close(): void {
        this.messagesSubject.unsubscribe();
    }

    addMessage(message: any): void {
        this.listMessage = [...[message], ...this.listMessage];
        this.noNotifySubject.next((this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada')).length);
        this.arrayMessagesSubject.next(this.listMessage);
    }

    changeStateNoView(): void {
        if (this.listMessage.filter(data => (data.Estado).toLowerCase() === 'enviada').length >= 1) {
            this.confService.post('notificacion_estado_usuario/changeStateNoView/' + this.user, {})
                .subscribe(res => {
                    this.listMessage = [];
                    this.queryNotification();
                });
        }
    }

    changeStateToView(id, estado): void {
        if (estado === 'noleida') {
            const notificacion = this.getNotificacionEstadoUsuario(id);
            this.confService.get('notificacion_estado_usuario/changeStateToView/' + notificacion.Id)
                .subscribe(res => {
                    this.listMessage = [];
                    this.queryNotification();
                });
        }
    }

    queryNotification(): void {
        const idToken = localStorage.getItem('id_token');
        const accessToken = localStorage.getItem('access_token');
        if (idToken !== null && accessToken !== null) {
            this.confService.get('notificacion_estado_usuario?query=Usuario:' + this.user + ',Activo:true&sortby=notificacion&order=asc&limit=-1')
                .subscribe((resp: any) => {
                    if (resp !== null) {
                        this.notificacionEstadoUsuario = resp;
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
