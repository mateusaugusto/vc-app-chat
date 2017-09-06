import {MessageDomain} from "../../domain/message-domain";

export interface IMessage extends MessageDomain {
    _id: string;
}