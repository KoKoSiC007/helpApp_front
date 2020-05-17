import React, {Component} from "react";
import ClientService from "../../services/ClientService";
import ClientModel from "../../models/Client";
import {Container, Spinner} from "reactstrap";
import Client from "./show";
interface IState {
    isEmpty: boolean,
    clients: ClientModel[]
}
export default class ClientList extends Component<any, IState>{
    private api: ClientService = new ClientService();

    constructor(props: any) {
        super(props);
        this.state = {
            isEmpty: true,
            clients: []
        }
        this.api.get().then( clients => this.setState({clients: clients, isEmpty: false}))
    }

    render() {
        return (
            <Container>
                {this.state.isEmpty ?
                    <Spinner color="primary" className="spinner"/>
                    : this.renderClients()}
            </Container>
        );
    }
    private renderClients(): JSX.Element[] {
        return this.state.clients.slice().map(client => <Client client={client} key={client.id}/>)
    }
}
