import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RoomComponent} from "./components/room.component";

const routes: Routes = [
  {
    path: 'rom', component: RoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRouting {
}
