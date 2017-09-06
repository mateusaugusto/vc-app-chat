import {UserDomain} from "./user-domain";
import {MessageDomain} from "./message-domain";

export class UnreadMessagesDomain{
    message: MessageDomain;
    user: UserDomain[];
}