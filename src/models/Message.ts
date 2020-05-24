import Ticket from "./Ticket";

export default class Message {
    id: string| undefined;
    text: string| undefined;
    createdAt: string| undefined;
    ticketId: string| undefined;
    senderId: string| undefined;
    private _ticket: Ticket| null;
    constructor();
    constructor(json: {
        id: string,
        text: string,
        createdAt: string,
        ticketId: string| undefined,
        senderId: string| undefined
    })
    constructor(json?: {
        id: string,
        text: string,
        createdAt: string,
        ticketId: string| undefined,
        senderId: string| undefined
    }){
        if (json){
            this.id = json.id;
            this.text = json.text;
            this.createdAt = json.createdAt;
            this.ticketId = json.ticketId;
            this.senderId = json.senderId;
        }
        this._ticket = null;
    }
}
