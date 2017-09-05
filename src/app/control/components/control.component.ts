import {Component, OnInit} from "@angular/core";
import {RoomService} from "../../core";
import {UserService} from "../../core/service/user.service";
import {ActivatedRoute, Route} from "@angular/router";
import {UserDomain} from "../../../server/src/domain/user-domain";
import {RoomDomain} from "../../../server/src/domain/room-domain";
import {TokenStoreService} from "../../oauth2/service/tokenstore.service";
import {SocketService} from "../../core/service/socket.service";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Component({
    selector: 'control',
    styleUrls: ['../../css/style.scss'],
    templateUrl: '../views/control.component.html'
})
export class ControlComponent implements OnInit {
    room: string = '';
    user: UserDomain;

    private socketService: SocketService;

    constructor(private roomService: RoomService,
                private route: ActivatedRoute,
                private userService: UserService,
                private tokenStoreService: TokenStoreService) {
    }

    ngOnInit() {
        this.socketService = new SocketService('control');
        this.socketService.getControl().subscribe(message => {

            let userIsconnetedInRoom = this.roomService.isConected(message);

            if(!userIsconnetedInRoom){
                //this.roomService.list = this.roomService.list.filter(room => room.name === message.room.name);
                this.roomService.list[0].name = "mudaa";

            }

        });


        let userParams: UserDomain = new UserDomain();

        userParams.accountId = +this.route.snapshot.params['accountId'];
        userParams.domainId = +this.route.snapshot.params['domainId'];
        userParams.clientId = +this.route.snapshot.params['clientId'];

        this.userService.findOne(userParams).subscribe(user => {
            this.user = user;
            this.userService.user = user;
            this.roomService.list = user.room.filter(room => room.isEnabled === true);

            //this.join(this.roomService.list[0]);

            if (user['token']) {
                this.tokenStoreService.setToken(user['token']);
            } else {
                // alert('Permission denied');
                // return false;
            }

            this.userService.findPrivateUsers(user).subscribe(privateUsers => {
                this.userService.privateList = privateUsers;
            });

            if (user['privateUsers']) {
                this.userService.findPrivateUsers(user).subscribe(privateUsers => {
                    this.userService.privateList = privateUsers;
                });
            }
            ;

        });


    }

    joinPrivateRoom(userRoom): void {
        this.roomService.findPrivateRoom(userRoom._id, this.user).subscribe(privateRoom => {
            if (Object.keys(privateRoom).length != 0) {
                // Seta o nome do user para a sala
                privateRoom[0].nickName = userRoom.name;
                this.join(privateRoom[0]);
            } else {
                let room = this.buildRoom(userRoom, this.user.name);
                this.roomService.create(room).subscribe(newRoom => {
                    // Add user to new private room
                    this.roomService.addUserToPrivateRoom(newRoom, userRoom._id, this.user['_id']).subscribe(newPrivateRoom => {
                        newRoom.nickName = userRoom.name;
                        this.roomService.privateList = newRoom[0];
                        this.join(newRoom);
                    });
                });
            }

        });
    }

    buildRoom(user: UserDomain, userPrivateName: String): RoomDomain {
        let room = new RoomDomain();
        room.privateRoom = true;
        room.name = `${user.name}:${userPrivateName}`;
        room.accountId = user.accountId;
        room.domainId = user.domainId;
        return room;
    }

    // Join room, when Join-button is pressed
    join(room: RoomDomain): void {
        if (!room.privateRoom) {
            room.nickName = room.name;
        }
        // Send user joined message
        this.roomService.addRoomToSocket(room).subscribe(message => {
            console.log("conected to socket" + message)
        });

        this.roomService.join(room);
        this.room = '';

        //this.socketService.set();
    }

    // Remove room, when Remove-button is pressed and unset selected room
    remove(): void {
        this.roomService.remove(this.room);
        this.room = '';
    }
}
