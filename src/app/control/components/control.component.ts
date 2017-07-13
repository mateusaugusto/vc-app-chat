import {Component} from "@angular/core";
import {RoomService} from "../../core";

@Component({
    selector: 'control',
    templateUrl: '../views/control.component.html'
})
export class ControlComponent {
    room: string = '';
    newRoom: string = '';
    clientId: number;

    constructor(public roomService: RoomService,) {
    }


    ngOnInit() {
        //this.clientId = +this.route.snapshot.params['clienteId'];

        /*this.userService.findOne(this.clientId).subscribe(user => {
         this.teste = user;
         });*/

        this.roomService.lisRoomsByUser("postman2").subscribe(rooms => {
            // this.rooms = rooms;
            this.roomService.list = rooms;
            console.log("aqui control" + rooms);
        });

        //console.log("ress  / " + this.teste);
        //this.userService.nickname = "luis";
    }


    // Join room, when Join-button is pressed
    join(room): void {
        this.roomService.join(room);
        this.room = '';
    }

    // Remove room, when Remove-button is pressed and unset selected room
    remove(): void {
        this.roomService.remove(this.room);
        this.room = '';
    }

}
