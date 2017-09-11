export class BaseDomain {
    name: string;
    created: string;
    domainId: number;
    accountId: number;
    isEnabled: boolean;
    _id: String;
    isUnread: boolean = false;
    countMessage: number = 0;
}