import Message from "../models/Message";
import getHeaders from "../helpers/getHeaders";

export default class MessageService {
    private url: string = 'http://localhost:5000/api/message'

    public get(): Promise<Message[]>{
        return fetch(this.url, {headers: getHeaders()})
            .then(res => res.json())
            .then(data => data.map((message: Message) => formatMessage(message)))
    }
    public put(model: Message): Promise<Message>{
        return fetch(`${this.url}/${model.id}`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                text: model.text,
                ticketId: model.ticketId,
                senderId: model.senderId
            })
        }).then(res => res.json()).then(data => formatMessage(data))
    }
    public post(model: Message): Promise<Message|void>{
        return fetch(`${this.url}`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                text: model.text,
                ticketId: model.ticketId,
                senderId: model.senderId
            })
        }).then(res => res.json()).then(data => formatMessage(data)).catch(error => console.error(error));
    }
    public delete(id: string): Promise<string>{
        return fetch(`${this.url}/${id}`, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(res => res.text());
    }

    public search(word: string): Promise<Message[]> {
        if (word) {
            return fetch(`${this.url}/search?data=${word}`, {headers: getHeaders()})
                .then(res => res.json())
                .then(data => data.map((org: { id: string, name: string }) => formatMessage(org)))
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        }
        else
            return this.get();
    }
}

function formatMessage(data: any): Message {
    return new Message({id: data.id, senderId: data.senderId, ticketId: data.ticketId, text: data.text, createdAt: data.createdAt})
}
