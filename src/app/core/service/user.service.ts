import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserDomain} from "../../../server/src/domain/user-domain";
import {BaseUrl} from "../../infra/base-url";
import {RoomDomain} from "../../../server/src/domain/room-domain";
import {IMessage} from "../../../server/src/interface/message/imessage";

@Injectable()
export class UserService extends BaseUrl{
  user: UserDomain;
  rooms: RoomDomain[] = [];

  constructor(private http: Http) {
    super();
  }

  // Get all posts from the API
  findOne(user: UserDomain) : Observable<UserDomain>{
    return this.http.get(this.getBaseUrl() + `user/domainId/${user.domainId}/accountId/${user.accountId}/clientId/${user.clientId}`)
        .map((response: Response) => response.json());
  }

  findOne2(name: string) : Observable<IMessage[]>{
    return this.http.get(this.getBaseUrl() + 'message/name/'+ name)
        .map((response: Response) => response.json());
  }

}