import Organization from "./Organization";
import OrganizationService from "../services/OrganizationService";

export default class Client {
    api: OrganizationService = new OrganizationService();
    id: string | undefined;
    name: string | undefined;
    orgId: string | undefined;
    private _organization: Organization | null;
    constructor();
    constructor(json: {id: string, name:string, orgId: string})
    constructor(json?: {id: string, name: string, orgId: string}){
        if (json){
            this.id = json.id;
            this.name = json.name;
            this.orgId = json.orgId;
        }
        this._organization = null;
    }

    get organization(){
        return this._organization!;
    }

    set organization(org: Organization){
        this._organization = org;
    }
}
