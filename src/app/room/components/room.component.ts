import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from "@angular/core";

import {RoomService, UserService} from "../../core";
import {IMessage, IRoom} from "../../../server/src";
import {MessageService} from "../service/message.service";
import {Http} from "@angular/http";
import {SecureHttpService} from "../../oauth2/service/secure-httpservice";
import {UserDomain} from "../../../server/src/domain/user-domain";
import {UnreadMessagesService} from "../../core/service/unreadmessages.service";

@Component({
    selector: 'room',
    styleUrls: ['../../css/style.scss'],
    templateUrl: '../views/room.component.html',
})
export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scroll') private scroll: ElementRef;
    @ViewChild('focus') private focus: ElementRef;

    @Input() room: IRoom;

    message: string = '';
    unreadMessage: string = '';
    search: string = '';
    user: UserDomain;
    messages: IMessage[];
    listSearchMessage: IMessage[];

    private messageService: MessageService;
    private alreadyLeftChannel: boolean = false;

    constructor(private roomService: RoomService,
                private userService: UserService,
                private http: Http,
                private unreadMessagesService: UnreadMessagesService,
                private secureHttpService: SecureHttpService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {

        this.user = this.userService.user;

        this.messageService = new MessageService(this.userService, this.room, this.http, this.secureHttpService);

        this.messageService.findOne(this.room._id).subscribe(message => {
            this.messages = message;
        });

        //Preenche a lista com as mensagens no socket
        this.messageService.messages.subscribe(messages => {
            this.messages.push(messages);
            setTimeout(() => {
                this.scrollToBottom();
            }, 200);
        });

    }

    searchMessage() {
        this.messageService.findMessages(this.room._id, this.search).subscribe(message => {
            this.listSearchMessage = message;
        });
    }

    // After view initialized, focus on chat message text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
        this.cdr.detectChanges();
    }

    // When component is destroyed, ensure that leave message is sent
    ngOnDestroy(): void {
        if (!this.alreadyLeftChannel) {
            this.leave();
        }
    }

    // Send chat message, and reset message text input
    send(): void {
        if (this.message !== '') {
            this.unreadMessage = this.message;
            this.messageService.send(this.message);
            this.createUnreadMessages();
            this.message = '';
        }
    }

    // Leave room gracefully
    leave(): void {
        this.alreadyLeftChannel = true;
        this.messageService.leave();
        this.roomService.leave(this.room.name);
    }

    //* Scroll to bottom (this is called when new message is received)
    scrollToBottom(): void {
        try {
            this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
        } catch (error) {
            console.log('ERROR:', error);
        }
    }

    createUnreadMessages(): void {
        //Privare rooms has one user do not need to retrieve it
        if (this.room.privateRoom) {
            this.saveUnreadMessages(this.buildUnreadObject(this.room.usersRoom));
        } else {
            // Retrieve all user in room
            this.userService.findAllUsersInRoom(this.room, this.user).subscribe(result => {
                // Create unread Message
                this.saveUnreadMessages(this.buildUnreadObject(result));
            });
        }
    }

    buildUnreadObject(list: any): any {
        return {
            user: list.filter(r => (r._id ? r._id : r) != this.user._id),
            room: this.room,
            message: this.unreadMessage
        };
    }

    saveUnreadMessages(unread: any): void {
        // Create unread Message
        this.unreadMessagesService.create(unread).subscribe(result => {
            console.log("created unread msg");
            //Send socket
            this.messageService.sendControl(result);
        });

    };

    cleanUnreadMessage(): void {
        this.unreadMessagesService.removeUserByRoom(this.buildObjectRoom()).subscribe(result => {
            this.room.isUnread = false;
            this.room.countMessage = 0;

            if(this.room.privateRoom){
                this.cleanPrivateRoomList();
            }

        });
    }

    cleanPrivateRoomList(): void {
        let userInRoom = this.room.usersRoom.filter(u => u != this.user._id);
        let userPrivate = this.userService.privateList.filter(user => user._id === userInRoom[0])[0];
        userPrivate.isUnread = false;
        userPrivate.countMessage = 0;
    }

    buildObjectRoom() {
        return {
            user: this.user,
            room: this.room
        }
    };
}
