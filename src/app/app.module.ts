import {NgModule} from "@angular/core";
// App component
import {AppComponent} from "./app.component";
import {CoreModule} from "./core";
import {SharedModule} from "./shared";
import {ControlModule} from "./control/control.module";
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
        OAuth2Module,
        RouterModule.forRoot([
            {path: 'user/domainId/:domainId/accountId/:accountId/clientId/:clientId', component: ControlComponent},
            {path: 'user/domainId/:domainId/accountId/:accountId/clientId/:clientId/roomId/:roomId', component: ControlComponent}
        ]),
    ],
    declarations: [
        AppComponent,
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
