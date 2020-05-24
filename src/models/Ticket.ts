import Project from "./Project";
import Manager from "./Manager";

export default class Ticket{
    id: string| undefined;
    description: string| undefined;
    created_at: Date| undefined;
    projectId: string| undefined;
    managerId: string| undefined;
    private _project: Project| null;
    private _manager: Manager| null;
    constructor();
    constructor(json: {
        id: string,
        description:string,
        projectId: string,
        managerId: string,
    })
    constructor(json?: {
        id: string,
        description: string,
        projectId: string,
        managerId: string,
    }){
        if (json){
            this.id = json.id;
            this.description = json.description;
            this.projectId = json.projectId;
            this.managerId = json.managerId;
        }
        this._project = null;
        this._manager = null;
    }

    get project(): Project{
        return this._project!;
    }

    set project(project: Project){
        this._project = project;
    }

    get manager(): Manager{
        return this._manager!;
    }
    set manager(manager: Manager){
        this._manager = manager;
    }
}
