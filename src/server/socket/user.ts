import {Room} from "../src";
import {MessageSocket} from "./message";
import {IUser} from "../src/interface/user/iuser";

export class UserSocket {
  nsp: any;
  name: string;
  data: any;
  socket: any;
  rooms: Room[] = [];
  messageSockets: MessageSocket[] = [];

  constructor(private io: any) {
    this.nsp = this.io.of('/user');
    this.nsp.on('connection', (socket: any) => {
      console.log('Client connected user');
      this.socket = socket;
      this.listen();
    });
  }

  // Add signal
  private listen(): void {
    this.socket.on('disconnect', () => this.disconnect());
  }

  // Handle disconnect
  private disconnect(): void {
    console.log('Client disconnected');
  }


}