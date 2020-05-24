import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import Message from "../../models/Message";
import Tickets from "../../models/Ticket";
interface IProps {
    handler?: any
    tickets: Tickets[]
}
interface IState {
    isOpen: boolean
    message: Message
}

export default class CreateMessage extends Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        let message = new Message();
        if (props.tickets[0])
            message.ticketId = props.tickets[0].id
        this.state = {
            isOpen: false,
            message: message
        }
        this.toggle = this.toggle.bind(this);
    }

    render() {
        let options = []
        for (let ticket of this.props.tickets){
            options.push(<option key={ticket.id} value={ticket.id}>{ticket.id}</option>)
        }
        return (
            <div>
                <Row id="new"
                     className="trow"
                     onClick={this.toggle}>
                    <img src="https://img.icons8.com/android/24/000000/plus.png" alt="Добавить Клиента"/>
                </Row>
                <Modal isOpen={this.state.isOpen}
                       toggle={this.toggle}>
                    <ModalHeader>Новое сообщение</ModalHeader>
                    <Form onSubmit={this.onSubmitHandler.bind(this)}>
                        <ModalBody>
                            <FormGroup style={{"margin": "10px"}}>
                                <Label className="mr-sm-2">Текст сообщения</Label>
                                <Input type="text"
                                       name="Name"
                                       placeholder="Введите сообщение"
                                       onChange={this.onChangeText.bind(this)}
                                />
                            </FormGroup>
                            <FormGroup style={{"margin": "10px", "width": "none"}}>
                                <Label className="mr-sm-2">Тикет</Label>
                                <Input type="select" name="ticketId" onChange={this.onChangeTicketId.bind(this)}>
                                    {options}
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">Create</Button>
                            <Button color="secondary">Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }

    private onSubmitHandler(){
        this.props.handler(this.state.message);
    }

    private onChangeText(event: any){
        event.preventDefault();
        let message= Object.assign(this.state.message);
        message.text = event.target.value
        this.setState({message: message});
    }

    private onChangeTicketId(event: any){
        event.preventDefault();
        let message= Object.assign(this.state.message);
        message.ticketId = event.target.value
        this.setState({message: message});
    }
    public toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }
}
