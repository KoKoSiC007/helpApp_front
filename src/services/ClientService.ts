import Client from "../models/Client";

export default class ClientService {
    private url: string = 'http://localhost:5000/api/client'

    public get(): Promise<Client[]>{
        return fetch(this.url)
            .then(res => res.json())
            .then(data => data.map((org: Client) => formatClient(org)))
    }
    public put(model: Client): Promise<Client>{
        return fetch(`${this.url}/${model.id}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
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
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
                name: model.name,
                orgId: model.orgId
            })
        }).then(res => res.json()).then(data => formatClient(data)).catch(error => console.error(error));
    }
    public delete(id: string): Promise<string>{
        return fetch(`${this.url}/${id}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'DELETE'
        }).then(res => res.text());
    }
}

function formatClient(data: any): Client {
    return new Client({id: data.id, name: data.name, orgId: data.orgId})
}
