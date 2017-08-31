import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {TokenStoreService} from "./tokenstore.service";

@Injectable()
export class SecureHttpService {

  constructor(protected http: Http,
              protected tokenStoreService: TokenStoreService) {
  }

  public getRequestOptions(): RequestOptions {

    let tokenInfo = this.tokenStoreService.getToken();

    return new RequestOptions(
      {
        headers: new Headers({
            "Authorization": tokenInfo,
            'Content-Type': 'application/json'
          }
        )
      }
    );
  }
}
