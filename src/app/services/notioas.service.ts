import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { fromEvent } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NotificacionesService {
    NOTIFICACION_SERVICE = '';

    public notificaciones: any = [];
    private notificacionesSubject = new Subject();
    public notificaciones$ = this.notificacionesSubject.asObservable();

    public menuActivo = false;
    private menuActivoSubject = new BehaviorSubject({});
    public menuActivo$ = this.menuActivoSubject.asObservable();

    public noleidas: number = 0;
    private noleidasSubject = new BehaviorSubject({});
    public noleidas$ = this.noleidasSubject.asObservable();

    // private loading = new BehaviorSubject({});
    // public loading$ = this.loading.asObservable();

    roles: any;
    user: any;
    nombreCola: string;
    listaLeidas: any = [];
    listaNoLeidas: any = [];
    listaTodasNotificaciones: any = [];

    constructor(private confService: ConfiguracionService) {
        //Cerrar el panel de notificaciones al hacer clic por fuera de el
        const up$ = fromEvent(document, 'mouseup');
        up$.subscribe((data: any) => {
            if (this.menuActivo) {
                if (((data.path
                    .map((info: any) => info.localName))
                    .filter((data: any) => (data === 'ng-uui-notioas'))).length === 0) {
                    this.toogleMenuNotifications();
                }
            }
        });
    }

    toogleMenuNotifications(): void {
        this.menuActivo = !this.menuActivo;
        this.menuActivoSubject.next({ activo: this.menuActivo });
    }

    init(pathNotificaciones: string, userData: any): void {
        this.NOTIFICACION_SERVICE = pathNotificaciones;
        this.confService.setPath(this.NOTIFICACION_SERVICE);
        if (typeof userData.userService !== 'undefined') {
            this.user = userData.userService;
            this.roles = userData.userService.role ? userData.userService.role : [];
            this.nombreCola = "colaWebComponent" //Definir el nombre de al cola de acuerdo al rol
            this.removeNotifications();
        }
    }

    saveMessage(notificacion: any): void {        
        let cuerpoNotificacion = notificacion.Body;
        // Guardar la notificacion por usuario
        if (cuerpoNotificacion.MessageAttributes.IdUsuario.Value === "usuario2") {
            if (cuerpoNotificacion.MessageAttributes.Estado.Value === "noleida") {
                this.listaNoLeidas = [...[cuerpoNotificacion], ...this.listaNoLeidas];
                this.noleidas++;
                this.noleidasSubject.next({ noLeidas: this.noleidas });
            } else {
                this.listaLeidas = [...[cuerpoNotificacion], ...this.listaLeidas];
            }
            /* Filtrar:
                Añadir las notificaciones 'noleidas' al principio de la lista
                Y solo 5 notificaciones 'leidas' al final */
            this.notificaciones = [...this.listaNoLeidas, ...this.listaLeidas.slice(0,5)]
            this.notificacionesSubject.next(this.notificaciones);
        }
        // Guardar las notificaciones(todas) en una lista 
        this.listaTodasNotificaciones = [...this.listaTodasNotificaciones, ...[cuerpoNotificacion]];
    }

    changeStateToView(): void {
        console.log("changeStateToView");
    }

    removeNotifications() {       
        return this.confService.get(`colas/mensajes?nombre=${this.nombreCola}.fifo&numMax=10`).pipe(
            concatMap(data => {
                if (data.Data !== null) {                    
                    let notificacion = data.Data[0]
                    this.saveMessage(notificacion)
                    return this.confService.post(`colas/mensajes/${this.nombreCola}.fifo`, notificacion);
                } else {
                    this.addNotifications() //Registrar nuevamente los mensajes de la lista general
                    return EMPTY;
                }
            })
        ).subscribe(
            data => {this.removeNotifications()}, 
            error => {console.log("Error al remover notificaciones", error)}
        )
    }

    addNotifications() {
        for (let i = 0; i < this.listaTodasNotificaciones.length; i++) {
            let notificacion = this.listaTodasNotificaciones[i]            
            const datos = {
                ArnTopic: notificacion.TopicArn,
                Asunto: notificacion.Subject,
                Atributos: {
                    IdUsuario: notificacion.MessageAttributes.IdUsuario.Value,
                    Estado: notificacion.MessageAttributes.Estado.Value
                },
                DestinatarioId: [ "id"+this.nombreCola ],
                IdDeduplicacion: new Date().getTime().toString(),
                IdGrupoMensaje: notificacion.MessageAttributes.IdUsuario.Value,
                Mensaje: notificacion.Message,
                RemitenteId: notificacion.MessageAttributes.Remitente.Value,
            };
            this.confService.post(`notificaciones/enviar`, datos).subscribe(
                (data: any) => {},
                (error: any) => {
                    console.error('Error creando notificación: ', notificacion.MessageId);
                }
            );
        }
    }
}
