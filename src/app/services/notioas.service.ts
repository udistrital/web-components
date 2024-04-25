import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { fromEvent } from 'rxjs';

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
        this.confService.setPath(this.NOTIFICACION_SERVICE);
        if (typeof userData.userService !== 'undefined') {
            this.user = userData.userService;
            this.roles = userData.userService.role ? userData.userService.role : [];
            this.queryNotification();
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

    queryNotification(): void {
        this.loading.next({ loading: true })
        console.log("URL", this.confService.path);
        console.log("trayendo las notificaciones");
        // if (this.user.document == "") {
        this.confService.get(`colas/mensajes/espera?nombre=${"colaWebComponent.fifo"}&tiempoEspera=1&filtro=IdUsuarios:${"usuario1"}`)
            .subscribe((res: any) => {
                if (res !== null && res.Data !== null) {
                    let listaNotificaciones = res.Data
                    for (let i = 0; i < listaNotificaciones.length; i++) {
                        let notificacion = listaNotificaciones[i].Body;
                        // notificacion.estado = "sinVer"
                        this.addMessage(notificacion);
                    }
                }
                this.loading.next({ loading: false })
            });
        // }
    }
}
