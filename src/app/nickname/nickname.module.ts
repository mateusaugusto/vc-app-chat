import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NicknameComponent} from "./components/nickname.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NicknameComponent,
  ],
  exports:[
    NicknameComponent
  ]
})
export class NicknameModule {
}
