import {Component, OnInit} from "@angular/core";
import {RoomService} from "../../core";
import {UserService} from "../../core/service/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserDomain} from "../../../server/src/domain/user-domain";
import {RoomDomain} from "../../../server/src/domain/room-domain";
import {TokenStoreService} from "../../oauth2/service/tokenstore.service";
import {SocketService} from "../../core/service/socket.service";
import {UnreadMessagesService} from "../../core/service/unreadmessages.service";
import {count} from "rxjs/operator/count";
import {BaseDomain} from "../../../server/src/domain/base-domain";

@Component({
    selector: 'control',
    styleUrls: ['../../css/style.scss'],
    templateUrl: '../views/control.component.html'
})
export class ControlComponent implements OnInit {
    room: string = '';
    user: UserDomain;
    privateRooms: RoomDomain[];

    private socketService: SocketService;

    constructor(private roomService: RoomService,
                private route: ActivatedRoute,
                private userService: UserService,
                private unreadMessagesService: UnreadMessagesService,
                private tokenStoreService: TokenStoreService) {
    }

    ngOnInit() {
        this.socketService = new SocketService('control');
        let userParams: UserDomain = new UserDomain();

        userParams.accountId = +this.route.snapshot.params['accountId'];
        userParams.domainId = +this.route.snapshot.params['domainId'];
        userParams.clientId = +this.route.snapshot.params['clientId'];

        this.userService.findOne(userParams).subscribe(user => {
            this.user = user;
            this.userService.user = user;

            // Pesquisa todas as salas privadas do usuario
            this.roomService.findAllPrivateRoom(this.user).subscribe(result => {
                this.privateRooms = result;

            });

            //Constroi lista e numero de mesnagens nao lidas por sala
            this.buildMessagesUnread();

            if (user['token']) {
                this.tokenStoreService.setToken(user['token']);
            } else {
                // alert('Permission denied');
                // return false;
            }

            // recupera os cliente privados que vem no header
            if (user['privateUsers']) {
                this.userService.findPrivateUsers(user).subscribe(privateUsers => {
                    this.userService.privateList = privateUsers;
                });
            };

        });

        // Socket que controla o envio de mensagens não lidas
        this.socketService.getControl().subscribe(message => {
            let userIsConnectedInRoom = this.roomService.isConected(message);

            if (message['room'].privateRoom) {
                this.controlListPrivateRoom(userIsConnectedInRoom, message);
            } else {
                this.controlListRoom(userIsConnectedInRoom, message);
            }
        });
    }

    controlListRoom(userIsConnectedInRoom: boolean, message: any): void {
        if (!userIsConnectedInRoom) {
            this.roomService.list
                .filter(room => room._id === message['room']._id ? this.buildUnreadMessage(room) : room);
        } else {
            if (this.isUserSentMessage(message['user']._id)) {
                this.unreadMessagesService.removeUserFromList(this.buildObjectUnread(message)).subscribe(result => {
                    console.log("created unread msg");
                });
            }
        }
    }

    controlListPrivateRoom(userIsConnectedInRoom: boolean, message: any): void {
        if (!userIsConnectedInRoom) {
            if (this.isUserSentMessage(message['user']._id)) {
                this.userService.privateList
                    .filter(user => user._id === message['user']._id ? this.buildUnreadMessage(user) : user);
            }
        } else {
            if (this.isUserSentMessage(message['user']._id)) {
                this.unreadMessagesService.removeUserFromList(this.buildObjectUnread(message)).subscribe(result => {
                    console.log("created unread msg");
                });
            }
        }
    }

    isUserSentMessage(idMessageUser: string): boolean{
        return this.user._id != idMessageUser;
    }

    buildUnreadMessage(base: BaseDomain): BaseDomain {
        if (base.countMessage == null) {
            base.countMessage = 0;
        }
        base.countMessage++;
        base.isUnread = true;
        return base;
    }

    buildMessagesUnread(): void {
        let roomList = this.user.room.filter(room => room.isEnabled === true);
        for (const room of roomList) {
            this.unreadMessagesService.countByRoomAndUser(room._id, this.user._id).subscribe(count => {
                let countMessages = count['count'];
                if (countMessages > 0) {
                    room.isUnread = true;
                    room.countMessage = countMessages;
                }
                this.roomService.list.push(room);
            });
        }
    }

    buildMessagesUnreadPrivate(): void {
        let privateRooms = this.privateRooms.filter(room => room.isEnabled === true);
        for (const room of privateRooms) {
            this.unreadMessagesService.countByRoomAndUser(room._id, this.user._id).subscribe(count => {
                let countMessages = count['count'];
                if (countMessages > 0) {
                    room.isUnread = true;
                    room.countMessage = countMessages;
                }
                this.roomService.list.push(room);
            });

        }
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

    buildObjectUnread(params: any) {
        return {
            user: this.user,
            unreadmessages: params
        }
    };

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
