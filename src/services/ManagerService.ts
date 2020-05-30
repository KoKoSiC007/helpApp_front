import getHeaders from "../helpers/getHeaders";
import Manager from "../models/Manager";

export default class ManagerService {
    private url: string = 'http://localhost:5000/api/stuff'

    public get(): Promise<Manager[]>{
        return fetch(this.url, {headers: getHeaders()})
            .then(res => res.json())
            .then(data => data.map((manager: Manager) => formatManager(manager)))
            .catch(error => {
                console.error(error);
                throw error;
            })
    }
    public put(model: Manager): Promise<Manager>{
        return fetch(`${this.url}/${model.id}`, {
            headers: getHeaders(),
            method: 'PUT',
            body: JSON.stringify({
                id: model.id,
                fname: model.fname,
                lname: model.lname,
                phone: model.phone,
                email: model.email,
                password: model.password
            })
        }).then(res => res.json()).then(data => formatManager(data))
    }
    public post(model: Manager): Promise<Manager|void>{
        return fetch(`${this.url}`, {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                fname: model.fname,
                lname: model.lname,
                phone: model.phone,
                email: model.email,
                password: model.password
            })
        }).then(res => res.json()).then(data => formatManager(data)).catch(error => console.error(error));
    }
    public delete(id: string): Promise<string>{
        return fetch(`${this.url}/${id}`, {
            headers: getHeaders(),
            method: 'DELETE'
        }).then(res => res.text());
    }
    public search(word: string): Promise<Manager[]> {
        if (word) {
            return fetch(`${this.url}/search?data=${word}`, {headers: getHeaders()})
                .then(res => res.json())
                .then(data => data.map((manager: { id: string, name: string }) => formatManager(manager)))
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        }
        else
            return this.get();
    }

}

export function formatManager(data: any): Manager {
    return new Manager({
        id: data.id,
        fname: data.fName,
        lname: data.lName,
        phone: data.phone,
        email: data.email,
        password: data.password
    })
}
