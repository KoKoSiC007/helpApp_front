import Client from "./Client";
import ProjectService from "../services/ProjectService";

export default class Project {
    api: ProjectService = new ProjectService();
    id: string | undefined;
    name: string | undefined;
    clientId: string | undefined;
    private _client: Client | null;
    constructor();
    constructor(json: {id: string, name:string, clientId: string})
    constructor(json?: {id: string, name: string, clientId: string}){
        if (json){
            this.id = json.id;
            this.name = json.name;
            this.clientId = json.clientId;
        }
        this._client = null;
    }

    get client(): Client{
        return this._client!;
    }

    set client(org: Client){
        this._client = org;
    }
}
