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
import {UnreadMessagesDomain} from "../../../server/src/domain/unreadmessages-domain";

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

    searchMessage(){
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

    // Handle keypress event, for sending chat message
    eventHandler(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.send();
        }
    }

    createUnreadMessages(): void {
        // Retrieve all user in room
        this.userService.findAllUsersInRoom(this.room, this.user).subscribe(result => {
            let unread = new UnreadMessagesDomain();
            unread.user = result.filter(r => r._id != this.user._id );
            unread.room = this.room;
            // Create unread Message
            this.unreadMessagesService.create(unread).subscribe(result => {
                console.log("created unread msg");
                //Send socket
                this.messageService.sendControl(result);
            });
        });
    }
}
