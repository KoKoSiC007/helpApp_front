import Ticket from "../models/Ticket";
import getHeaders from "../helpers/getHeaders";
import Manager from "../models/Manager";
import {formatManager} from "./ManagerService";

export default class TicketService {
    private url: string = 'http://localhost:5000/api/ticket'

    public get(): Promise<Ticket[]>{
        return fetch(this.url, {headers: getHeaders()})
            .then(res => res.json())
            .then(data => data.map((ticket: Ticket) => formatTicket(ticket)))
            .catch(error => {
                console.warn(error);
                throw error;
            })
    }
    public put(model: Ticket): Promise<Ticket>{
        console.warn(model);
        return fetch(`${this.url}/${model.id}`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                description: model.description,
                projectId: model.projectId,
                managerId: model.managerId
            })
        })
            .then(res => res.json())
            .then(data => formatTicket(data))
            .catch(error => {
                console.error(error);
                throw error;
            })
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
        })
            .then(res => res.json())
            .then(data => formatTicket(data))
            .catch(error => {
                console.error(error);
                throw error;
            });
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
    public getManager(id: string | undefined): Promise<Manager>{
        return fetch(`${this.url}/${id}/manager`, {headers: getHeaders()})
            .then(res => res.json())
            .then(data => formatManager(data))
    }
}

function formatTicket(data: any): Ticket {
    return new Ticket({
        id: data.id,
        projectId: data.projectId,
        managerId: data.managerId,
        description: data.description
    })
}
