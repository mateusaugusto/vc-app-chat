import {Component} from "@angular/core";
import {RoomService} from "../../core";
import {UserService} from "../../core/service/user.service";
import {ActivatedRoute, Route} from "@angular/router";
import {UserDomain} from "../../../server/src/domain/user-domain";
import {RoomDomain} from "../../../server/src/domain/room-domain";

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

  joinPrivateRoom(userRoom): void {
    this.roomService.findPrivateRoom(userRoom._id, this.user).subscribe(privateRoom => {
      if(Object.keys(privateRoom).length != 0){
          this.joinPrivate(privateRoom[0]);
      }else{
          let room = this.buildRoom(userRoom);
          this.roomService.create(room).subscribe(newRoom => {
              // Add user to new private room
              this.roomService.addUserToPrivateRoom(newRoom, userRoom._id, this.user['_id']).subscribe(newPrivateRoom => {
                  this.joinPrivate(newRoom);
              });

          });
      }

    });
  }

   buildRoom(user: UserDomain): RoomDomain{
       let room = new RoomDomain();
       room.privateRoom = true;
       room.name = user.name;
       room.accountId = user.accountId;
       room.domainId = user.domainId;
       return room;
   }

    // Join room, when Join-button is pressed
    join(room): void {
        this.roomService.join(room);
        this.room = '';
    }

    // Join room, when Join-button is pressed
    joinPrivate(room): void {
        this.roomService.joinPrivate(room);
        this.room = '';
    }

  // Remove room, when Remove-button is pressed and unset selected room
  remove(): void {
    this.roomService.remove(this.room);
    this.room = '';
  }
}
