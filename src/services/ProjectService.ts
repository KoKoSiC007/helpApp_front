import Project from "../models/Project";
import getHeaders from "../helpers/getHeaders";

export default class ProjectService {
    private url: string = 'http://localhost:5000/api/project'

    public get(): Promise<Project[]>{
        return fetch(this.url, {headers: getHeaders()})
            .then(res => res.json())
            .then(data => data.map((org: Project) => formatProject(org)))
            .catch(error => {
                console.warn(error);
                throw error;
            })
    }
    public put(model: Project): Promise<Project>{
        return fetch(`${this.url}/${model.id}`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                name: model.name,
                clientId: model.clientId
            })
        }).then(res => res.json()).then(data => formatProject(data))
    }
    public post(model: Project): Promise<Project|void>{
        return fetch(`${this.url}`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                name: model.name,
                clientId: model.clientId
            })
        }).then(res => res.json()).then(data => formatProject(data)).catch(error => console.error(error));
    }
    public delete(id: string): Promise<string>{
        return fetch(`${this.url}/${id}`, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(res => res.text());
    }

    public search(word: string): Promise<Project[]> {
        if (word) {
            return fetch(`${this.url}/search?data=${word}`, {headers: getHeaders()})
                .then(res => res.json())
                .then(data => data.map((org: { id: string, name: string }) => formatProject(org)))
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        }
        else
            return this.get();
    }
}

function formatProject(data: any): Project {
    return new Project({id: data.id, name: data.name, clientId: data.clientID})
}
