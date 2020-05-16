import Organization from "../models/Organization";

export default class OrganizationService {
    private url: string = "http://localhost:5000/api/organization"
    public get(): Promise<Organization[]>{
        return  fetch(this.url)
            .then(res => res.json())
            .then(data => data.map((org: { id: string, name: string }) => formatOrganization(org)));
    }
    public put(model: Organization): Promise<Organization> {
        return fetch(`${this.url}/${model.id}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                name: model.name
            })
        }).then(res => res.json()).then( data => formatOrganization(data))
    }
}
function formatOrganization(data: any): Organization {
    return new Organization({ id: data.id, name: data.name });
}
