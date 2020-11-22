import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoadComponent } from './road/road.component';
import { TripeComponent } from './tripe/tripe.component';
import { CommandComponent } from './command/command.component';

const routes: Routes = [{
    path: 'road',
    component: RoadComponent
}, {
    path: 'tripe',
    component: TripeComponent
}, {
    path: 'command',
        component: CommandComponent
}, {
    path: '',
    redirectTo: 'road',
    pathMatch: 'full'
},
/*{ path: '**', component: PageNotFoundComponent }*/];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
