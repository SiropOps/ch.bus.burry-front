import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
// import { SystemService } from '../service/system.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    source$: Observable<number> = timer(0, 1000);
    // private subscription: Subscription;
    navbarOpen = false;
    public isUp = true;

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }

    constructor(/*private systemService: SystemService*/) { }

    ngOnInit() {
        // this.subscription = this.source$.subscribe(() => this.systemService.get().subscribe((res) => {
        //     this.isUp = res.up;
        //     if (this.isUp) {
        //         this.subscription.unsubscribe();
        //     }

        // }));
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

}
