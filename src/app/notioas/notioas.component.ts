import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NotioasService } from './../services/notioas.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ng-uui-notioas',
  templateUrl: './notioas.component.html',
  styleUrls: ['./notioas.component.scss']
})
export class NotioasComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  notificaciones: any;
  basePathAssets = 'https://pruebasassets.portaloas.udistrital.edu.co/';
  // tslint:disable-next-line: ban-types
  activo: Boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.notificacionService.activo$
      .subscribe((isActive: any) => {
        const { activo } = isActive;
        this.activo = activo;
      });
    this.notificacionService.loading$
      .subscribe((isLoading: any) => {
        const { loading } = isLoading;
        this.loading = loading;
      });
  }

  constructor(public notificacionService: NotioasService) {
    this.notificaciones = [];
    this.notificacionService.arrayMessages$
      .subscribe((notification: any) => {
        this.notificaciones = notification;
      });
    this.notificacionService.getNotificaciones();
  }

  // tslint:disable-next-line: typedef
  redirect(noti) {
    this.notificacionService.changeStateToView(noti.Id, noti.Estado);
    window.open(noti.Content.Message.Link, '_blank');

    // if (noti.Content.Message.Link.indexOf(path_sub) === -1) {
    //   window.open(noti.Content.Message.Link, '_blank');
    // } else {
    //   this.router.navigate([noti.Content.Message.Link.substring(noti.Content.Message.Link.indexOf('#') + 1)]);
    // }
  }
}
