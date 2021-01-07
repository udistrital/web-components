import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfiguracionService } from './configuracion.service';
import { ImplicitAutenticationService } from './implicit_autentication.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    public sidebar: boolean = false;

    private sidebarSubject = new BehaviorSubject(false);
    public sidebar$ = this.sidebarSubject.asObservable();

    private menuSubject = new BehaviorSubject({});
    public menu$ = this.menuSubject.asObservable();

    constructor(
        private configuracionService: ConfiguracionService,
        private userService: ImplicitAutenticationService
    ) {
        fromEvent(document, 'mouseup').subscribe((data: any) => {
            if (this.sidebar) {
                if ((
                    data.path
                        .map((info: any) => (info.localName))
                        .filter((dataFilter: any) => (dataFilter === 'ng-uui-sidebar'))).length === 0) {
                    this.closeNav();
                }
            }
        });
    }

    getMenu() {
        const menuInfo = localStorage.getItem('menu');
        if (menuInfo) {
            this.menuSubject.next(JSON.parse(atob(menuInfo)));
        } else {
            this.userService.user$.subscribe((user: any) => {
                if (user) {
                    const role = user.user ? user.user.role ? user.user.role.filter((menu) => (menu !== 'Internal/everyone')).join(',') : "" : "";
                    if (role !== '') {
                        this.configuracionService.getMenu(role, environment.appMenu, 'menu_opcion_padre/ArbolMenus')
                            .subscribe((data) => {
                                let navItems = data;
                                navItems = [...[{
                                    Nombre: 'Inicio',
                                    Icono: 'home',
                                    Url: 'pages',
                                    Opciones: []
                                }]
                                    , ...navItems];
                                this.updateMenu(navItems);
                            })
                    }
                }
            })
        }
    }

    public closeNav() {
        this.sidebar = false;
        this.sidebarSubject.next(this.sidebar);
    }

    public updateMenu(menu) {
        localStorage.setItem('menu', btoa(JSON.stringify(menu)));
        this.menuSubject.next(menu);
    }


    public openNav() {
        this.sidebar = true;
        this.sidebarSubject.next(this.sidebar);
    }

    public toogle() {
        this.sidebar = !this.sidebar;
        this.sidebarSubject.next(this.sidebar);
    }
}
