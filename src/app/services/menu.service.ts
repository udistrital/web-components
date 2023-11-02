import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { ConfiguracionService } from './configuracion.service';
import { ImplicitAutenticationService } from './implicit_autentication.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    public sidebar = false;

    private optionSubject = new BehaviorSubject(false);
    public option$ = this.optionSubject.asObservable();

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

    getMenu(appMenu: string): void {
        const menuInfo = localStorage.getItem('menu');
        if (menuInfo) {
            this.menuSubject.next(JSON.parse(atob(menuInfo)));
        } else {
            this.userService.user$.subscribe((userResponse: any) => {
                const { user, userService } = userResponse;
                if (user && userService) {
                    const role1: Set<string> = user.role ? new Set<string>(user.role) : new Set();
                    const role2: Set<string> = userService.role ? new Set<string>(userService.role) : new Set();
                    const roles = Array.from(new Set<string>([...role1, ...role2])).join(',');
                    if (roles) {
                        this.configuracionService.getMenu(roles, appMenu, 'menu_opcion_padre/permisos_roles')
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
                            });
                    }
                }
            });
        }
    }

    public updateOption(option): void {
        this.optionSubject.next(option);
    }

    public closeNav(): void {
        this.sidebar = false;
        this.sidebarSubject.next(this.sidebar);
    }

    public updateMenu(menu): void {
        localStorage.setItem('menu', btoa(JSON.stringify(menu)));
        this.menuSubject.next(menu);
    }


    public openNav(): void {
        this.sidebar = true;
        this.sidebarSubject.next(this.sidebar);
    }

    public toogle(): void {
        this.sidebar = !this.sidebar;
        this.sidebarSubject.next(this.sidebar);
    }
}
