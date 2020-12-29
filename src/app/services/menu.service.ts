import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    public sidebar: boolean = false;

    private sidebarSubject = new BehaviorSubject(false);
    public sidebar$ = this.sidebarSubject.asObservable();

    constructor() {
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

    public closeNav() {
        this.sidebar = false;
        this.sidebarSubject.next(this.sidebar);
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
