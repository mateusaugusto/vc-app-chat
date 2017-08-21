import {Component} from "@angular/core";
import {RoomService} from "../../core";
import {UserService} from "../../core/service/user.service";
import {ActivatedRoute, Route} from "@angular/router";
import {UserDomain} from "../../../server/src/domain/user-domain";

@Component({
  selector: 'control',
  templateUrl: '../views/control.component.html'
})
export class ControlComponent{
  room: string = '';
  user: UserDomain;

  constructor(private roomService: RoomService,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    let userParams: UserDomain = new UserDomain();

    userParams.accountId = +this.route.snapshot.params['accountId'];
    userParams.domainId = +this.route.snapshot.params['domainId'];
    userParams.clientId = +this.route.snapshot.params['clientId'];

    this.userService.findOne(userParams).subscribe(user => {
      this.user = user;
      this.userService.user = user;
      this.roomService.list = user.room;

      if(user['privateUsers']){
        this.userService.findPrivateUsers(user).subscribe(privateUsers => {
          this.userService.privateList = privateUsers;
        });
      };

    });
  }

  // Join room, when Join-button is pressed
  join(room): void {
    this.roomService.join(room);
    this.room = '';
  }

  joinPrivateRoom(userRoom): void {

    this.roomService.findPrivateRoom(userRoom._id, this.user).subscribe(privateRoom => {
      if(privateRoom){
        this.roomService.joinPrivate(privateRoom);
        this.room = '';
      }

    });


  }

  // Remove room, when Remove-button is pressed and unset selected room
  remove(): void {
    this.roomService.remove(this.room);
    this.room = '';
  }
}
