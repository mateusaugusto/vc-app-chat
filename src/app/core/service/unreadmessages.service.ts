import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BaseUrl} from "../../infra/base-url";
import {Http, Response} from "@angular/http";
import {SecureHttpService} from "../../oauth2/service/secure-httpservice";
import {UnreadMessagesDomain} from "../../../server/src/domain/unread-domain";

@Injectable()
export class UnreadMessagesService extends BaseUrl {

    constructor(private http: Http,
                private secureHttpService: SecureHttpService) {
        super();
    }

    create(params: any): Observable<any> {
        return this.http.put(this.getBaseUrl() + 'unreadmessages', params, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    removeUserFromList(params: any): Observable<any> {
        return this.http.post(this.getBaseUrl() + 'unreadmessages/', params, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    removeUserByRoom(params: any): Observable<any> {
        return this.http.post(this.getBaseUrl() + 'unreadmessages/room', params, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    countByRoomAndUser(roomId: String, userId: String): Observable<any> {
        return this.http.get(this.getBaseUrl() + `unreadmessages/room/${roomId}/user/${userId}`, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

    removeByUserAndRoom(params: any): Observable<any> {
        return this.http.post(this.getBaseUrl() + `unreadmessages/room/`, params, this.secureHttpService.getRequestOptions())
            .map((response: Response) => response.json());
    }

}