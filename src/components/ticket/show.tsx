import React, {Component} from 'react'
import TicketModel from "../../models/Ticket";
import {Row} from "reactstrap";
import UpdateTicket from "./update";

interface IProps {
    ticket: TicketModel;
    onDelete: any
}
interface IState {
    isOpen: boolean
    ticket: TicketModel
}
export default class Ticket extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            ticket: this.props.ticket
        }
        this.updateClient = this.updateClient.bind(this);
        this.delete = this.delete.bind(this);
    }

    private hiddenView: JSX.Element =
        <Row id={this.props.ticket.id}
             onClick={this.showView.bind(this)}
             className="trow">
            {this.props.ticket.description}
        </Row>
    private openView : JSX.Element =
        <div onClick={this.showView.bind(this)}
             className="trow row">
            <div className="col-8" id={this.props.ticket.id}>
                ID: {this.props.ticket.id}<br/>
                Description: {this.props.ticket.description}
            </div>
            <div className="col-4 trow__buttons">
                <UpdateTicket ticket={this.props.ticket} onTicketUpdate={this.updateClient} buttonLabel="Update"/>
                <button onClick={this.delete.bind(this)} className="btn btn-danger">Delete</button>
            </div>
        </div>

    render() {
        if (this.state.isOpen) return  this.openView
        else return this.hiddenView;
    }

    public updateClient(ticket: TicketModel){
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
