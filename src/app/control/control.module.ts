import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ControlComponent} from "./components/control.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ControlComponent,
  ],
  exports:[
    ControlComponent
  ]
})
export class ControlModule {
}
