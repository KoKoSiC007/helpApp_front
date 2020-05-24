import Client from "../models/Client";
import getHeaders from "../helpers/getHeaders";
import Organization from "../models/Organization";

export default class ClientService {
    private url: string = 'http://localhost:5000/api/client'

    public get(): Promise<Client[]>{
        return fetch(this.url, {headers: getHeaders()})
            .then(res => res.json())
            .then(data => data.map((org: Client) => formatClient(org)))
    }
    public put(model: Client): Promise<Client>{
        return fetch(`${this.url}/${model.id}`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                name: model.name,
                orgId: model.orgId
            })
        }).then(res => res.json()).then(data => formatClient(data))
    }
    public post(model: Client): Promise<Client|void>{
        return fetch(`${this.url}`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                name: model.name,
                orgId: model.orgId
            })
        }).then(res => res.json()).then(data => formatClient(data)).catch(error => console.error(error));
    }
    public delete(id: string): Promise<string>{
        return fetch(`${this.url}/${id}`, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(res => res.text());
    }

    public search(word: string): Promise<Client[]> {
        if (word) {
            return fetch(`${this.url}/search?data=${word}`, {headers: getHeaders()})
                .then(res => res.json())
                .then(data => data.map((org: { id: string, name: string }) => formatClient(org)))
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        }
        else
            return this.get();
    }
}

function formatClient(data: any): Client {
    return new Client({id: data.id, name: data.name, orgId: data.orgId})
}
