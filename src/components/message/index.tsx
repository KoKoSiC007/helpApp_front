import React, {Component} from "react";
import MessageService from "../../services/MessageService";
import MessageModel from "../../models/Message";
import {Button, Container, Input, InputGroup, InputGroupAddon, Spinner} from "reactstrap";
import Ticket from "../../models/Ticket";
import Message from "./show";
import TicketService from "../../services/TicketService";
import CreateMessage from "./new";
interface IState {
    search: string
    isEmpty: boolean,
    messages: MessageModel[]
    tickets: Ticket[]
}
class MessageList extends Component<any, IState>{
    private messageService: MessageService = new MessageService();
    private ticketService: TicketService = new TicketService();

    constructor(props: any) {
        super(props);
        this.state = {
            search: '',
            isEmpty: true,
            messages: [],
            tickets: []
        }
        this.messageService.get().then( messages => this.setState({messages: messages, isEmpty: false}))
        this.ticketService.get().then( tickets => tickets ? this.setState({tickets: tickets}) : null)
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
                        : this.renderMessages()}
                </Container>
            </div>
        );
    }

    public createHandle(model: MessageModel){
        this.messageService.post(model).then(ticket => {
            let tickets = this.state.messages.slice();
            if (ticket) {
                tickets.push(ticket);
            }
            this.setState({messages: tickets})
        })
    }
    public deleteHandle(id: string){
        this.messageService.delete(id).then(data => {
            let delIndex = this.state.messages.findIndex(ticket => ticket.id === data);
            let newTickets = this.state.messages.slice();
            newTickets.splice(delIndex,1 )
            this.setState({messages: newTickets})
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
        this.messageService.search(this.state.search).then( messages => this.setState({messages}))
    }

    private renderMessages(): JSX.Element[] {
        let appendElement = <CreateMessage key="new" tickets={this.state.tickets} handler={this.createHandle.bind(this)}/>
        let elements = this.state.messages.slice().map(message => <Message onDelete={this.deleteHandle.bind(this)} message={message} key={message.id}/>)
        return [...elements, appendElement]
    }
}

export default MessageList;
