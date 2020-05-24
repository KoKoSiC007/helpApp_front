import Project from "./Project";
import Message from "./Message";

export default class Manager {
    id: string| undefined;
    fname: string| undefined;
    lname: string| undefined;
    phone: string| undefined;
    email: string| undefined;
    password: string| undefined;
    private _messages: Message[]| null;
    private _projects: Project[]| null;

    constructor();
    constructor(json: {
        id: string,
        fname: string,
        lname: string,
        phone: string,
        email: string,
        password: string
    })
    constructor(json?: {
        id: string,
        fname: string,
        lname: string,
        phone: string,
        email: string,
        password: string
    }){
        if (json){
            this.id = json.id;
            this.fname = json.fname;
            this.lname = json.lname;
            this.email = json.email;
            this.phone = json.phone;
            this.password = json.password;
        }
        this._messages = null;
        this._projects = null;
    }
}
