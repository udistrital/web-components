import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificacionesService } from './../services/notificaciones.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ng-uui-notioas',
  templateUrl: './notioas.component.html',
  styleUrls: ['./notioas.component.scss'],
  animations: [
    trigger('listAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-20px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in')
      ])
    ]),
  ]
})
export class NotioasComponent implements OnInit {
  @Output() notificacion: EventEmitter<any> = new EventEmitter();
  
  menuActivo: boolean = false;
  loading: boolean;
  notificaciones: any = [];

  constructor(public notificacionesService: NotificacionesService) {
    this.notificacionesService.notificacion$.subscribe((notificacion) => {
      this.notificacion.emit(notificacion);
    });
  }

  ngOnInit(): void {
    this.subscribeToMenuActivo();
    this.subscribeToLoading();
    this.subscribeToNotificaciones();
  }

  private subscribeToMenuActivo(): void {
    this.notificacionesService.menuActivo$.subscribe((menuActivo: boolean) => {
      this.menuActivo = menuActivo;
    });
  }

  private subscribeToLoading(): void {
    this.notificacionesService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }

  private subscribeToNotificaciones(): void {
    this.notificacionesService.notificaciones$.subscribe((notificaciones: any[]) => {
      this.notificaciones = notificaciones;
    });
  }

  redirect(notificacion:any) {
    this.notificacionesService.changeStateToView(notificacion);
  }
}
