import React, {Component} from "react";
import ClientService from "../../services/ClientService";
import ClientModel from "../../models/Client";
import {Button, Container, Input, InputGroup, InputGroupAddon, Spinner} from "reactstrap";
import Client from "./show";
import CreateClient from "./new";
import OrganizationService from "../../services/OrganizationService";
import Organization from "../../models/Organization";
interface IState {
    search: string
    isEmpty: boolean,
    clients: ClientModel[]
    organizations: Organization[]
}
export default class ClientList extends Component<any, IState>{
    private clientService: ClientService = new ClientService();
    private orgService: OrganizationService = new OrganizationService();

    constructor(props: any) {
        super(props);
        this.state = {
            search: '',
            isEmpty: true,
            clients: [],
            organizations: []
        }
        this.clientService.get().then( clients => this.setState({clients: clients, isEmpty: false}))
        this.orgService.get().then( organizations => organizations ? this.setState({organizations}) : null)
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button onClick={this.search.bind(this)}>Поиск</Button></InputGroupAddon>
                    <Input onChange={this.changeHandle.bind(this)}
                           value={this.state.search}
                           onKeyPress={this.enterHandler.bind(this)}
                           placeholder="Введите что нибуть"
                    />
                </InputGroup>
                <Container>
                    {this.state.isEmpty ?
                        <Spinner color="primary" className="spinner"/>
                        : this.renderClients()}
                </Container>
            </div>
        );
    }

    public createHandle(model: ClientModel){
        this.clientService.post(model).then(client => {
            let clients = this.state.clients.slice();
            if (client) {
                clients.push(client);
            }
            this.setState({clients: clients})
        })
    }
    public deleteHandle(id: string){
        this.clientService.delete(id).then(data => {
            let delIndex = this.state.clients.findIndex(client => client.id === data);
            let newClients = this.state.clients.slice();
            newClients.splice(delIndex,1 )
            this.setState({clients: newClients})
        })
    }
    private changeHandle(event: any){
        this.setState({search: event.target.value});
    }

    private enterHandler(event: any){
        if (event.key == 'Enter'){
            this.search();
        }
    }

    private search(){
        this.clientService.search(this.state.search).then( clients => this.setState({clients}))
    }
    private renderClients(): JSX.Element[] {
        let appendElement = <CreateClient key="new" organizations={this.state.organizations} handler={this.createHandle.bind(this)}/>
        let elements = this.state.clients.slice().map(client => <Client onDelete={this.deleteHandle.bind(this)} client={client} key={client.id}/>)
        return [...elements, appendElement]
    }
}
