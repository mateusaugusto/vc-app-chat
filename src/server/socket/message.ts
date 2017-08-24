import {IMessage, Message, Room} from "../src";

export class MessageSocket {
    nsp: any;
    data: any;
    socket: any;

    constructor(io: any, public room: Room) {
        console.log("tentando connectar no socker message");
        this.nsp = io.of("/messages/" + encodeURIComponent(this.room.name));
        this.nsp.on("connection", (socket: any) => {
            console.log("Client connected to room:", this.room.name);
            this.socket = socket;
            this.listen();
        });
    }

    // Add signal
    private listen(): void {
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("create", message => this.create(message));
        this.socket.on("list", () => this.list());
    }

    // Handle disconnect
    private disconnect(): void {
        console.log("Client disconnected from room:", this.room.name);
    }

    // Create a message in a room
    private create(params: IMessage): void {
        console.log("criando socker message" + params);
        Message.create(params).subscribe(
            message => {
                Message.findOne(message).subscribe(result => {
                    this.nsp.emit('item', result);
                });
            },
            error => console.error('Message sending failed', error)
        );
    }

    // List all messages in a room
    private list(): void {
        console.log("listando socker message" );
        this.room.messages()
            .map(messages => messages.reverse())
            .subscribe(messages => messages.map(message => this.socket.emit(message)));
    }
}