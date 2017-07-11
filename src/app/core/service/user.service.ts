import { IRoom } from '../../../server/src';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {UserDomain} from "../../../server/src/domain/user-domain";
import {BaseUrl} from "../../infra/base-url";

@Injectable()
export class UserService extends BaseUrl{
  nickname: string;
  rooms: IRoom[] = [];

  constructor(private http: Http) {
    super();
  }

  // Get all posts from the API
  findOne(id: number) : Observable<UserDomain>{
    return this.http.get(this.getBaseUrl() + 'user/'+ id)
        .map((response: Response) => response.json());
  }

}