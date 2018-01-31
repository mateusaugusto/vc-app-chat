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
    room: RoomDomain;
    user: UserDomain;
    privateRooms: RoomDomain[];
    roomId: string;
    search = '';
    listSearchRoom: RoomDomain[] = [];

    private socketService: SocketService;

    constructor(private roomService: RoomService,
                private route: ActivatedRoute,
                private userService: UserService,
                private unreadMessagesService: UnreadMessagesService,
                private tokenStoreService: TokenStoreService) {

        this.authorizeNotification();
    }

    ngOnInit() {
        this.socketService = new SocketService('control');
        let userParams: UserDomain = new UserDomain();
        this.roomId = this.route.snapshot.params['roomId'];

        userParams.accountId = +this.route.snapshot.params['accountId'];
        userParams.domainId = +this.route.snapshot.params['domainId'];
        userParams.clientId = +this.route.snapshot.params['clientId'];


        this.userService.findOne(userParams).subscribe(user => {
            this.user = user;
            this.userService.user = user;

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
                    // Pesquisa todas as salas privadas do usuario
                    this.roomService.findAllPrivateRoom(this.user).subscribe(result => {
                        this.privateRooms = result;
                        this.userService.privateList = privateUsers;
                        this.buildMessagesUnreadPrivate();
                    });

                });
            }
        });

        // Socket que controla o envio de mensagens não lidas
        this.socketService.getControl().subscribe(message => {
            if (message['room'].privateRoom) {
                if (this.amIinRoom(message)) {
                    this.controlListPrivateRoom(message);
                }
            } else {
                this.controlListRoom(message);
            }
        });
    }

    searchRoom() {
        if (this.search != '' && this.search.length >= 3) {
            var search = new RegExp(this.search , "i");
            this.listSearchRoom = this.roomService.list.filter(room => room.name.match(search));
        }
    }

    cleanSearchRoom() {
        this.listSearchRoom = [];
    }

    controlListRoom(message: any): void {
        if (!this.userIsConnectedInRoom(message) && this.userHasRoomMessage(message)) {
            this.roomService.list.filter(room => room._id === message['room']._id ? this.buildUnreadMessage(room) : room);
            this.showNotification(message);
        } else {
            if (this.isUserSentMessage(message['user']._id)) {
                this.unreadMessagesService.removeUserFromList(this.buildObjectUnread(message)).subscribe(result => {
                    console.log("created unread msg");
                });
            }
        }
    }

    controlListPrivateRoom(message: any): void {
        if (!this.userIsConnectedInRoom(message) && !this.userHasRoomMessage(message)) {
            if (this.isUserSentMessage(message['user']._id)) {
                this.userService.privateList.filter(user => user._id === message['user']._id ? this.buildUnreadMessage(user) : user);
                this.showNotification(message);
            }
        } else {
            if (this.isUserSentMessage(message['user']._id)) {
                this.unreadMessagesService.removeUserFromList(this.buildObjectUnread(message)).subscribe(result => {
                    console.log("created unread msg");
                });
            }
        }
    }

    userIsConnectedInRoom(message: any): boolean {
        return this.roomService.isConected(message) || (null != this.room ? this.room._id == message['room']._id: false);
    }

    userHasRoomMessage(message: any): boolean {
        return this.roomService.list.filter(room => room._id == message['room']._id).length > 0;
    }

    //User is connected in Room
    amIinRoom(message: any): boolean{
        return  message['room'].usersRoom.filter(user => user === this.user._id).length > 0;
    }

    showNotification(param: any) {
        var options = {
            body: this.buildTextNotification(param).substring(0, 50).concat("..."),
            tag : param.room.name,
            icon: "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-31-64.png",
            //image: ""
        }

        var notification = new Notification(`Nova mensagem de ${param.user.name}`, options);

        notification.onclick = function () {
            window.focus();
        };

        setTimeout(function() {
            notification.close()
        }, 4000);
    }

    buildTextNotification(param: any): string {
        if (param.room.privateRoom) {
            return `${param.user.name} diz: ${param.unread.message}`;
        } else {
            return `Sala ${param.room.name} : ${param.unread.message}`;
        }
    }

    isUserSentMessage(idMessageUser: string): boolean {
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
        // Se a rota vier com id da sala, filtra por sala
        if(this.roomId){
            this.join(this.user.room.filter(room => room._id == this.roomId)[0]);
            return;
        }

        let roomList = this.user.room.filter(room => room.isEnabled === true);
        for (const room of roomList) {
            //Conta o numero de msg nao lidas por sala
            this.unreadMessagesService.countByRoomAndUser(room._id, this.user._id).subscribe(count => {
                let countMessages = count['count'];
                if (countMessages > 0) {
                    room.isUnread = true;
                    room.countMessage = countMessages;
                }
                // Inseri na lista de salas
                this.roomService.list.push(room);
            });
        }



    }

    buildMessagesUnreadPrivate(): void {
        let privateRooms = this.privateRooms.filter(room => room.isEnabled === true);

        for (const room of privateRooms) {
            this.unreadMessagesService.countByRoomAndUser(room._id, this.user._id).subscribe(count => {

                let userInRoom = room.usersRoom.filter(u => u != this.user._id);
                let userPrivate = this.userService.privateList.filter(user => user._id === userInRoom[0])[0];
                let countMessages = count['count'];
                if (countMessages > 0 && userPrivate) {
                    userPrivate.isUnread = true;
                    userPrivate.countMessage = countMessages;
                }
            });
        }
    }

    joinPrivateRoom(userRoom): void {
        this.roomService.findPrivateRoom(userRoom._id, this.user).subscribe(privateRoom => {
            if (Object.keys(privateRoom).length != 0) {
                this.join(this.setFieldsPrivateRoom(privateRoom[0], userRoom));
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

    setFieldsPrivateRoom(privateRoom: RoomDomain, userRoom: any): RoomDomain {
        // Seta o nome do user para a sala
        privateRoom.nickName = userRoom.name;
        if (userRoom.isUnread) {
            privateRoom.isUnread = true;
            privateRoom.countMessage = userRoom.countMessage;
        }
        return privateRoom;
    };

    buildRoom(user: UserDomain, userPrivateName: String): RoomDomain {
        let room = new RoomDomain();
        room.privateRoom = true;
        room.name = `${user.name}_${userPrivateName}`;
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

        this.cleanSearchRoom();

        if (!room.privateRoom) {
            room.nickName = room.name;
        }
        // Send user joined message
        this.roomService.addRoomToSocket(room).subscribe(message => {
            console.log("conected to socket" + message)
        });

        this.roomService.join(room);
        this.room = room;
    }

    authorizeNotification() {
        Notification.requestPermission(function (perm) {
        });
    }



}
