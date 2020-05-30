import React, {Component} from "react";
import TicketService from "../../services/TicketService";
import TicketModel from "../../models/Ticket";
import {Button, Container, Input, InputGroup, InputGroupAddon, Spinner} from "reactstrap";
import ProjectService from "../../services/ProjectService";
import Project from "../../models/Project";
import Ticket from "./show";
import CreateTicket from "./new";
import Manager from "../../models/Manager";
import ManagerService from "../../services/ManagerService";
interface IState {
    search: string
    isEmpty: boolean,
    tickets: TicketModel[],
    projects: Project[],
    managers: Manager[]
}
class TicketList extends Component<any, IState>{
    private projectService: ProjectService = new ProjectService();
    private ticketService: TicketService = new TicketService();
    private managerService: ManagerService = new ManagerService();
    constructor(props: any) {
        super(props);
        this.state = {
            search: '',
            isEmpty: true,
            tickets: [],
            projects: [],
            managers: []
        }
    }
    componentDidMount() {
        this.ticketService.get().then( tickets => this.setState({tickets: tickets, isEmpty: false}));
        this.managerService.get().then(managers => managers? this.setState({managers}) : null);
        this.projectService.get().then( projects => projects ? this.setState({projects}) : null);
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
                        : this.renderTickets()}
                </Container>
            </div>
        );
    }

    public createHandle(model: TicketModel){
        this.ticketService.post(model).then(ticket => {
            let tickets = this.state.tickets.slice();
            if (ticket) {
                tickets.push(ticket);
            }
            this.setState({tickets: tickets})
        })
    }
    public deleteHandle(id: string){
        this.ticketService.delete(id).then(data => {
            let delIndex = this.state.tickets.findIndex(ticket => ticket.id === data);
            let newTickets = this.state.tickets.slice();
            newTickets.splice(delIndex,1 )
            this.setState({tickets: newTickets})
        })
    }
    private changeHandle(event: any){
        this.setState({search: event.target.value});
    }
    private enterHandler(event: any){
        if (event.key === 'Enter'){
            this.search();
        }
    }
    private search(){
        this.ticketService.search(this.state.search).then( tickets => this.setState({tickets}))
    }
    private renderTickets(): JSX.Element[] {
        let appendElement = <CreateTicket key="new" projects={this.state.projects.slice()} managers={this.state.managers.slice()} handler={this.createHandle.bind(this)}/>
        let elements = this.state.tickets.slice().map(ticket => <Ticket onDelete={this.deleteHandle.bind(this)} manager={ticket.manager} ticket={ticket} key={ticket.id}/>)
        return [...elements, appendElement]
    }
}

export default TicketList;
