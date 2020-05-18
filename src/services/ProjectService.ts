import Project from "../models/Project";

export default class ProjectService {
    private url: string = 'http://localhost:5000/api/project'

    public get(): Promise<Project[]>{
        return fetch(this.url)
            .then(res => res.json())
            .then(data => data.map((org: Project) => formatClient(org)))
    }
    public put(model: Project): Promise<Project>{
        return fetch(`${this.url}/${model.id}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                name: model.name,
                clientId: model.clientId
            })
        }).then(res => res.json()).then(data => formatClient(data))
    }
    public post(model: Project): Promise<Project|void>{
        return fetch(`${this.url}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
                name: model.name,
                clientId: model.clientId
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

function formatClient(data: any): Project {
    return new Project({id: data.id, name: data.name, clientId: data.clientId})
}
