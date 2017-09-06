import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BaseUrl} from "../../infra/base-url";
import {Http, Response} from "@angular/http";
import {SecureHttpService} from "../../oauth2/service/secure-httpservice";
import {UnreadMessagesDomain} from "../../../server/src/domain/unreadmessages-domain";

@Injectable()
export class UnreadMessagesService extends BaseUrl {

    constructor(private http: Http,
                private secureHttpService: SecureHttpService) {
        super();
    }

    create(unread: UnreadMessagesDomain): Observable<any> {
        return this.http.put(this.getBaseUrl() + 'unreadmessages', unread, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    removeUserFromList(params: any, userId: String): Observable<any> {
        return this.http.post(this.getBaseUrl() + 'unreadmessages/user/' + userId, params.unread, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

}