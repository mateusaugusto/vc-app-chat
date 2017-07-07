import { IRoom } from '../../../models';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {UserDomain} from "../../../models/domain/user-domain";

@Injectable()
export class UserService {
  nickname: string;
  rooms: IRoom[] = [];

  constructor(private http: Http) { }

  // Get all posts from the API
  findOne(id: number) : Observable<UserDomain>{
    return this.http.get('http://localhost:5000/api/user/'+ id)
        .map((response: Response) => response.json());
  }

/*  private socketService: SocketService;*/

/*  constructor() {
    // Open room socket
    this.socketService = new SocketService('user');

    // Get initial list
    this.socketService.list();
  }*/

  // Create User
 /* create(name: string) {
    this.socketService.create(name);
  }

  findOne(id: number){
    this.socketService.findOne(id);
  }*/

}