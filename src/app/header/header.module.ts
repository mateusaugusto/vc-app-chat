import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule {
}
