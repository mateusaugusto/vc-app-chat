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
    this.socket.on('create', (name: string) => this.create(name));
    //this.socket.on('findOne', (id: number) => this.findOne(id));
  }

  // Handle disconnect
  private disconnect(): void {
    console.log('Client disconnected');
  }

  // Create a cliet
  private create(name: string): void {
    var user: IUser;
    user.name =  name;

  /*  User.create(user).subscribe(
        () => console.error('Client created'),
      error => console.error('Room creation failed', error)
    );*/
  }


  /*// Create a cliet
  private findOne(id: number): void {
    User.findOne(id).subscribe(
        () => console.error('Client created'),
        error => console.error('Room creation failed', error)
    );
  }*/

}