import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {TokenStoreService} from "./service/tokenstore.service";
import {SecureHttpService} from "./service/secure-httpservice";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    SecureHttpService,
    TokenStoreService
  ]
})
export class OAuth2Module {

}

