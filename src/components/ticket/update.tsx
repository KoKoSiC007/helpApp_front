import TicketModel from '../../models/Ticket'
import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import TicketService from "../../services/TicketService";
import ManagerService from "../../services/ManagerService";
import Manager from "../../models/Manager";

interface IProps {
    ticket: TicketModel,
    buttonLabel: string
    onTicketUpdate: any,
}

interface IState {
    isOpen: boolean
    ticket: TicketModel
    managers: Manager[]
}

export default class UpdateTicket extends Component<IProps, IState> {
    private api: TicketService = new TicketService();
    private managerService = new ManagerService();
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            ticket: props.ticket,
            managers: []
        }
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }
    componentDidMount() {
        this.managerService.get().then(managers => this.setState({managers}));
    }

    public toggle(): void {
        this.setState({isOpen: !this.state.isOpen})
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
        let managerOptions = [];
        for (let manager of this.state.managers){
            managerOptions.push(<option key={manager.id} value={manager.id}>{manager.fullname}</option>)
        }
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.isOpen}
                       toggle={this.toggle}>
                    <ModalHeader>Update Client</ModalHeader>
                    <Form onSubmit={this.update}>
                        <ModalBody>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for={this.props.ticket.id} className="mr-sm-2">Description</Label>
                                <Input type="text"
                                       name="Description"
                                       id={this.props.ticket.id}
                                       defaultValue={this.props.ticket.description}
                                       onChange={this.onDescriptionChange}/>
                            </FormGroup>
                            <FormGroup style={{"margin": "10px", "width": "none"}}>
                                <Label className="mr-sm-2">Менеджер</Label>
                                <Input type="select" name="managerId" onChange={this.onChangeManagerId.bind(this)}>
                                    {managerOptions}
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Update</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }

    private onChangeProjectId(event: any){
        event.preventDefault();
        let ticket= Object.assign(this.state.ticket);
        ticket.projectId = event.target.value
        this.setState({ticket: ticket});
    }
    private onChangeManagerId(event: any){
        event.preventDefault();
        let ticket = Object.assign(this.state.ticket);
        ticket.managerId = event.target.value
        this.setState({ticket: ticket});
    }
}
