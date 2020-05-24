import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import Ticket from "../../models/Ticket";
import Project from "../../models/Project";
interface IProps {
    handler?: any
    projects: Project[]
}
interface IState {
    isOpen: boolean
    ticket: Ticket
}

export default class CreateTicket extends Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        let ticket = new Ticket();
        if (props.projects[0])
            ticket.projectId = props.projects[0].id
        this.state = {
            isOpen: false,
            ticket: ticket
        }
        this.toggle = this.toggle.bind(this);
    }

    render() {
        let options = []
        for (let project of this.props.projects){
            options.push(<option key={project.id} value={project.id}>{project.name}</option>)
        }
        return (
            <div>
                <Row id="new"
                     className="trow"
                     onClick={this.toggle}>
                    <img src="https://img.icons8.com/android/24/000000/plus.png" alt="Добавить Тикет"/>
                </Row>
                <Modal isOpen={this.state.isOpen}
                       toggle={this.toggle}>
                    <ModalHeader>Новый Тикет</ModalHeader>
                    <Form onSubmit={this.onSubmitHandler.bind(this)}>
                        <ModalBody>
                            <FormGroup style={{"margin": "10px"}}>
                                <Label className="mr-sm-2">Описание</Label>
                                <Input type="text"
                                       name="Name"
                                       placeholder="Введите описание проблемы"
                                       onChange={this.onChangeDescription.bind(this)}
                                />
                            </FormGroup>
                            <FormGroup style={{"margin": "10px", "width": "none"}}>
                                <Label className="mr-sm-2">Проект</Label>
                                <Input type="select" name="orgId" onChange={this.onChangeProjectId.bind(this)}>
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
        this.props.handler(this.state.ticket);
    }

    private onChangeDescription(event: any){
        event.preventDefault();
        let ticket= Object.assign(this.state.ticket);
        ticket.description = event.target.value
        this.setState({ticket: ticket});
    }

    private onChangeProjectId(event: any){
        event.preventDefault();
        let ticket= Object.assign(this.state.ticket);
        ticket.projectId = event.target.value
        this.setState({ticket: ticket});
    }
    public toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }
}
