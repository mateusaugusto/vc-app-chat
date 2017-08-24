import {TokenInfo} from "../model/tokeninfo";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class TokenStoreService {

  private OAUTH_TOKEN = "OAUTH_TOKEN";

  invalidTokenRequired = new EventEmitter<boolean>();

  setToken(token: string): void {
    sessionStorage.setItem(this.OAUTH_TOKEN, token);
  }

  getToken(): string {
    let jsonToken = sessionStorage.getItem(this.OAUTH_TOKEN);
    return jsonToken;
  }
}
