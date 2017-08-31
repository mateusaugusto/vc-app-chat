import {UserDomain} from "../../domain/user-domain";

export interface IUser extends UserDomain {
    _id: string;
}
