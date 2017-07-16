import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RoomComponent} from "./components/room.component";
import {SharedModule} from "../shared/shared.module";
import {MessageService} from "./service/message.service";
import {RoomRouting} from "./room.routing";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RoomRouting,
        HttpModule
    ],
    declarations: [
        RoomComponent
    ],
    providers: [
        MessageService
    ],
    exports: [
        RoomComponent
    ]
})
export class RoomModule {
}
