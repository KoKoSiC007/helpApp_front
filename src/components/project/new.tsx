import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import Client from "../../models/Client";
import Project from "../../models/Project";
interface IProps {
    handler?: any
    clients: Client[]
}
interface IState {
    isOpen: boolean
    project: Project
}

export default class CreateProject extends Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        let project = new Project();
        if (props.clients[0])
            project.clientId = props.clients[0].id
        this.state = {
            isOpen: false,
            project: project
        }
        this.toggle = this.toggle.bind(this);
    }

    render() {
        let options = []
        for (let client of this.props.clients){
            options.push(<option key={client.id} value={client.id}>{client.name}</option>)
        }
        return (
            <div>
                <Row id="new"
                     className="trow"
                     onClick={this.toggle}>
                    <img src="https://img.icons8.com/android/24/000000/plus.png" alt="Добавить Проект"/>
                </Row>
                <Modal isOpen={this.state.isOpen}
                       toggle={this.toggle}>
                    <ModalHeader>Новый Проект</ModalHeader>
                    <Form onSubmit={this.onSubmitHandler.bind(this)}>
                        <ModalBody>
                            <FormGroup style={{"margin": "10px"}}>
                                <Label className="mr-sm-2">Название</Label>
                                <Input type="text"
                                       name="Name"
                                       placeholder="Введите название проекта"
                                       onChange={this.onChangeName.bind(this)}
                                />
                            </FormGroup>
                            <FormGroup style={{"margin": "10px", "width": "none"}}>
                                <Label className="mr-sm-2">Клиент</Label>
                                <Input type="select" name="orgId" onChange={this.onChangeClientId.bind(this)}>
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
        this.props.handler(this.state.project);
    }

    private onChangeName(event: any){
        event.preventDefault();
        let project= Object.assign(this.state.project);
        project.name = event.target.value
        this.setState({project: project});
    }

    private onChangeClientId(event: any){
        event.preventDefault();
        let project= Object.assign(this.state.project);
        project.clientId = event.target.value
        this.setState({project: project});
    }
    public toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }
}
