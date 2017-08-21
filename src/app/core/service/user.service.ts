import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserDomain} from "../../../server/src/domain/user-domain";
import {BaseUrl} from "../../infra/base-url";
import {RoomDomain} from "../../../server/src/domain/room-domain";

@Injectable()
export class UserService extends BaseUrl{
  user: UserDomain;
  rooms: RoomDomain[] = [];
  privateList: UserDomain[];

  constructor(private http: Http) {
    super();
  }

  // Get all posts from the API
  findOne(user: UserDomain) : Observable<UserDomain>{
    return this.http.get(this.getBaseUrl() + `user/domainId/${user.domainId}/accountId/${user.accountId}/clientId/${user.clientId}`)
        .map((response: Response) => response.json());
  }

  findPrivateUsers(user: UserDomain) : Observable<UserDomain[]>{
    let privateUsers =  user['privateUsers'];
    return this.http.get(this.getBaseUrl() + `user/domainId/${user.domainId}/accountId/${user.accountId}/privateusers/${privateUsers}`)
        .map((response: Response) => response.json());
  }

}