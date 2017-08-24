import {NgModule} from "@angular/core";
// App component
import {AppComponent} from "./app.component";
import {CoreModule} from "./core";
import {SharedModule} from "./shared";
import {RoomsComponent} from "./rooms";
import {ControlModule} from "./control/control.module";
import {RoomModule} from "./room/room.module";
import {RouterModule} from "@angular/router";
import {ControlComponent} from "./control/components/control.component";
import {HttpModule} from "@angular/http";
import {OAuth2Module} from "./oauth2/oauth2.module";

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        ControlModule,
        HttpModule,
        RoomModule,
        OAuth2Module,
        RouterModule.forRoot([
            {
                path: 'user/domainId/:domainId/accountId/:accountId/clientId/:clientId',
                component: ControlComponent
            }
        ]),
    ],
    declarations: [
        AppComponent,
        RoomsComponent
    ],
    exports: [
        CoreModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
