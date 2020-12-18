import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    public sidebar: any;

    constructor() {
    }

    public closeNav() {
        this.sidebar.close();
    }

    public openNav() {
        this.sidebar.open();
    }
}
