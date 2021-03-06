import { Room, Message } from '../src';
import { MessageSocket } from './message';
import {IRoom} from "../src/interface/room/iroom";
import {RoomDomain} from "../src/domain/room-domain";

export class RoomSocket {
  nsp: any;
  name: string;
  data: any;
  socket: any;
  rooms: Room[] = [];
  messageSockets: MessageSocket[] = [];

  constructor(private io: any) {
    this.nsp = this.io.of('/room');
    this.nsp.on('connection', (socket: any) => {
      console.log("conectado a sala");
      this.socket = socket;
      this.updateMessageSockets();
      this.listen();

    });
  }

  // Add signal
  private listen(): void {
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('findOne', (room: IRoom) => this.findOne(room));
  }

  // Handle disconnect
  private disconnect(): void {
    console.log('Client disconnected');
  }


  // List all rooms
  private findOne(room: RoomDomain): void {
    Room.findOne(room).subscribe(rooms => {
      this.rooms = rooms;
      this.updateMessageSockets();
      this.nsp.emit('item', rooms);
    });

  }

  // Update message sockets
  private updateMessageSockets(): void {
    // Add message sockets for new rooms
    let validRooms = {};
    for (const room of this.rooms) {
      validRooms[room.name] = true;
      const matches = this.messageSockets.filter(messageSocket => messageSocket.room.name === room.name);
      if (matches.length == 0) {
        console.log('inserindo no socket', room.name);
        this.messageSockets.push(new MessageSocket(this.io, room));
      }
    }

    // Destroy sockets for removed rooms
    for (const index in this.messageSockets) {
      const messageSocket = this.messageSockets[index];
      if (!validRooms[messageSocket.room.name]) {
        this.messageSockets.splice(parseInt(index, 10), 1);
      }


    }
  }
}