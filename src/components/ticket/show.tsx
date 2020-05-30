import React, {Component} from 'react'
import TicketModel from "../../models/Ticket";
import {Row} from "reactstrap";
import UpdateTicket from "./update";
import Manager from "../../models/Manager";
import TicketService from "../../services/TicketService";

interface IProps {
    ticket: TicketModel;
    onDelete: any;
    manager: Manager
}
interface IState {
    isOpen: boolean
    ticket: TicketModel,
    manager: Manager
}
export default class Ticket extends Component<IProps, IState> {
    private ticketService: TicketService = new TicketService();
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            ticket: this.props.ticket,
            manager: this.props.ticket.manager
        }
        this.ticketService.getManager(this.state.ticket.id).then(manager => {
            this.setState({manager});
        })
        this.updateTicket = this.updateTicket.bind(this);
        this.delete = this.delete.bind(this);
    }

    render() {
        if (this.state.isOpen) return (<div onClick={this.showView.bind(this)} className="trow row">
            <div className="col-8" id={this.props.ticket.id}>
                ID: {this.props.ticket.id}<br/>
                Description: {this.props.ticket.description}<br/>
                Manager: {this.state?.manager?.fullname}
            </div>
            <div className="col-4 trow__buttons">
                <UpdateTicket ticket={this.props.ticket} onTicketUpdate={this.updateTicket} buttonLabel="Update"/>
                <button onClick={this.delete.bind(this)} className="btn btn-danger">Delete</button>
            </div>
        </div>)
        else return ( <Row id={this.props.ticket.id}
                           onClick={this.showView.bind(this)}
                           className="trow">
            {this.props.ticket.description}
        </Row>);
    }

    public updateTicket(ticket: TicketModel){
        this.setState({ticket: ticket})
    }

    public delete(): void {
        this.props.onDelete(this.props.ticket.id);
    }

    public showView(event: any): void{
        if (event?.nativeEvent?.target?.id === this.props.ticket.id)
            this.setState({isOpen: !this.state.isOpen})
    }
}
