import {Observable} from "rxjs";
import * as io from "socket.io-client";

export class SocketService {
    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    socket: SocketIOClient.Socket;

    constructor(private name: string) {
        let socketUrl = this.host + '/' + this.name;
        this.socket = io.connect(socketUrl);
    }

    isConected(params: any): boolean {
        let connections = this.socket.io.connecting.filter(room => room.nsp.split("/messages/", 2)[1] === params.room.name );
        if (connections.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    // Get items observable
    items(): Observable<any> {
        return Observable.create(observer => {
            this.socket.on('item', (item: any) => {
                console.log("message" + item);
                observer.next(item);
            });
        });
    }

    // Get items observable
    enviou(): Observable<any> {
        console.log("entrou aqui 1 ");
        return Observable.create(observer => {
            this.socket.on('envi', (item: any) => {
                console.log("entrou aqui" + item);
                observer.next(item);
            });
        });
    }

    getControl() {
        let observable = new Observable(observer => {
            this.socket.on('control', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    list(): void {
        this.socket.emit('list');
    }

    // Create signal
    create(params: any) {
        console.log(this.socket);
        //this.sockets.adapter.rooms[];
        this.socket.emit('create', params);
    }

    set(params: any) {
        this.socket.emit('sent', params);
    }

    findOne(params: any) {
        this.socket.emit('findOne', params);
    }

    // Remove signal
    remove(params: any) {
        this.socket.emit('remove', params);
    }

    onConnect(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('connect', () => observer.complete());
        })
    }

    onDisconnect(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('disconnect', () => observer.complete());
        })
    }
}
