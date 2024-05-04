import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from './../services/notificaciones.service';

@Component({
  selector: 'ng-uui-notioas',
  templateUrl: './notioas.component.html',
  styleUrls: ['./notioas.component.scss']
})
export class NotioasComponent implements OnInit {
  menuActivo: boolean = false;
  loading: boolean;
  notificaciones: any = [];

  constructor(public notificacionesService: NotificacionesService) {}

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
    console.log(notificacion);
    // this.notificacionService.changeStateToView(noti.Id, noti.Estado);
    // window.open(noti.Content.Message.Link, '_blank');
    // if (noti.Content.Message.Link.indexOf(path_sub) === -1) {
    //   window.open(noti.Content.Message.Link, '_blank');
    // } else {
    //   this.router.navigate([noti.Content.Message.Link.substring(noti.Content.Message.Link.indexOf('#') + 1)]);
    // }
  }
}
