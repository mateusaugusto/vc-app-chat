import {IMessage} from "../src/interface/message/imessage";


export class ControlSocket {
  nsp: any;
  socket: any;

  constructor(private io: any) {
    this.nsp = this.io.of('/control');
    this.nsp.on('connection', (socket: any) => {
      console.log("Entrou na applicacao connectou no socket");
      this.socket = socket;
      this.listen();
      console.log(Object.keys(this.io.of('/control').connected).length);
    });


  }

  // Add signal
  private listen(): void {
    this.socket.on("sent", message => this.sent(message));
  }

  sent(params: IMessage): void{

    this.socket.adapter.clients((err, clients) => {
     // console.log("aqui" + clients); // an array containing all connected socket ids
    });

    this.nsp.emit('control', params);
  }

}