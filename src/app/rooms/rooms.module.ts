import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {RoomsService} from "./service/rooms.service";
import {RoomsComponent} from "./components/rooms.component";

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    RoomsComponent,
  ],
  providers: [
    RoomsService
  ]
})
export class RoomsModule {}
