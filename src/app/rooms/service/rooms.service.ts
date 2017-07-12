import {BaseUrl} from "../../infra/base-url";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {BaseDomain} from "../../../server/src/domain/base-domain";

@Injectable()
export class RoomsService extends BaseUrl {

  constructor(private http: Http) {
    super();

  }



  // Get all posts from the API
  listbyUser(name: string) : Observable<BaseDomain[]>{
    return this.http.get(this.getBaseUrl() + 'room/name/'+ name)
        .map((response: Response) => response.json());
  }

}