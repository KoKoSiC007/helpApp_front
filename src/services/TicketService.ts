import Ticket from "../models/Ticket";
import getHeaders from "../helpers/getHeaders";

export default class TicketService {
    private url: string = 'http://localhost:5000/api/ticket'

    public get(): Promise<Ticket[]>{
        return fetch(this.url, {headers: getHeaders()})
            .then(res => res.json())
            .then(data => data.map((ticket: Ticket) => formatTicket(ticket)))
    }
    public put(model: Ticket): Promise<Ticket>{
        return fetch(`${this.url}/${model.id}`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                description: model.description,
                projectId: model.projectId,
                managerId: model.managerId
            })
        }).then(res => res.json()).then(data => formatTicket(data))
    }
    public post(model: Ticket): Promise<Ticket|void>{
        return fetch(`${this.url}`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                description: model.description,
                projectId: model.projectId,
                managerId: model.managerId
            })
        }).then(res => res.json()).then(data => formatTicket(data)).catch(error => console.error(error));
    }
    public delete(id: string): Promise<string>{
        return fetch(`${this.url}/${id}`, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(res => res.text());
    }

    public search(word: string): Promise<Ticket[]> {
        if (word) {
            return fetch(`${this.url}/search?data=${word}`, {headers: getHeaders()})
                .then(res => res.json())
                .then(data => data.map((org: { id: string, name: string }) => formatTicket(org)))
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        }
        else
            return this.get();
    }
}

function formatTicket(data: any): Ticket {
    return new Ticket({id: data.id, projectId: data.projectId, managerId: data.managerId, description: data.description})
}
