import TicketModel from '../../models/Ticket'
import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import TicketService from "../../services/TicketService";

interface IProps {
    ticket: TicketModel,
    buttonLabel: string
    onTicketUpdate: any,
}

interface IState {
    isOpen: boolean
    ticket: TicketModel
}

export default class UpdateTicket extends Component<IProps, IState> {
    private api: TicketService = new TicketService()

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            ticket: props.ticket
        }
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }

    public toggle(): void {
        this.setState({isOpen: true})
    }

    public async update(): Promise<void> {
        await this.api.put(this.state.ticket);
    }

    public onDescriptionChange(event: any): void {
        let ticket = Object.assign(this.props.ticket)
        ticket.description = event.target.value
        this.setState({ticket: ticket})
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.isOpen}
                       toggle={this.toggle}>
                    <ModalHeader>Update Client</ModalHeader>
                    <Form inline onSubmit={this.update}>
                        <ModalBody>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for={this.props.ticket.id} className="mr-sm-2">Name</Label>
                                <Input type="text"
                                       name="Description"
                                       id={this.props.ticket.id}
                                       defaultValue={this.props.ticket.description}
                                       onChange={this.onDescriptionChange}/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Update</Button>
                            <Button color="secondary">Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}
