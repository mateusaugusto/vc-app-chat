import {Room} from "../../models";
import {MessageSocket} from "./message";
import {IUser, User} from "../../models/user.model";

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
    this.socket.on('create', (name: string) => this.create(name));
  }

  // Handle disconnect
  private disconnect(): void {
    console.log('Client disconnected');
  }

  // Create a cliet
  private create(name: string): void {
    var user: IUser;
    user.name =  name;

    User.create(user).subscribe(
        () => console.error('Client created'),
      error => console.error('Room creation failed', error)
    );
  }

}