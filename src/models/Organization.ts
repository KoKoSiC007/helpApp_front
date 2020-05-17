export default class Organization {
    id: string | undefined;
    name: string | undefined;
    constructor();
    constructor(json: {id: string, name: string});
    constructor(json?: {id: string, name: string} ) {
        if (json){
            this.id = json.id;
            this.name = json.name;
        }
    }
}
