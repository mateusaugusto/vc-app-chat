import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";

import {RoomService, UserService} from "../../core";
import {IMessage, IRoom} from "../../../server/src";
import {MessageService} from "../service/message.service";
import * as http from "http";
import {Http} from "@angular/http";

@Component({
    selector: 'room',
    templateUrl: '../views/room.component.html'
})
export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scroll') private scroll: ElementRef;
    @ViewChild('focus') private focus: ElementRef;

    @Input() room: IRoom;

    message: string = '';
    messages: IMessage[];

    private messageService: MessageService;
    private alreadyLeftChannel: boolean = false;

    constructor(private roomService: RoomService,
                public userService: UserService,
                private http: Http) {
    }

    // Handle keypress event, for saving nickname
    ngOnInit(): void {

        this.messageService = new MessageService(this.userService, this.room, this.http);

        this.messageService.findOne(this.room._id).subscribe(message => {
            this.messages = message;
        });

        this.messageService.messages.subscribe(messages => {
            this.messages.push(messages);
            setTimeout(() => {
                this.scrollToBottom();
            }, 200);
        });


    }

    // After view initialized, focus on chat message text input
    ngAfterViewInit(): void {
        this.focus.nativeElement.focus();
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
}
