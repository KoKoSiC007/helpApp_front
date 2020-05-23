import Organization from "../models/Organization";
import getHeaders from "../helpers/getHeaders";

export default class OrganizationService {
    private url: string = "http://localhost:5000/api/organization"

    public get(): Promise<Organization[]>;
    public get(id: string): Promise<Organization>;
    public get(id?: string): Promise<Organization | Organization[]> {
        if (id) {
            return fetch(`${this.url}/${id}`, {
                headers: getHeaders(),
            })
                .then(res => res.json())
                .then(data => formatOrganization(data))
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        } else {
            return fetch(this.url, {
                headers: getHeaders()
            })
                .then(res => res.json())
                .then(data => data.map((org: { id: string, name: string }) => formatOrganization(org)));
        }
    }

    public post(model: Organization): Promise<Organization> {
        return fetch(`${this.url}`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                name: model.name
            })
        }).then(res => res.json()).then(data => formatOrganization(data))
    }

    public put(model: Organization): Promise<Organization> {
        return fetch(`${this.url}/${model.id}`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                name: model.name
            })
        }).then(res => res.json()).then(data => formatOrganization(data))
    }

    public delete(id: string): Promise<string> {
        return fetch(`${this.url}/${id}`, {
            headers: getHeaders(),
            method: 'DELETE',
        }).then(res => res.text());
    }
}

function formatOrganization(data: any): Organization {
    return new Organization({id: data.id, name: data.name});
}
