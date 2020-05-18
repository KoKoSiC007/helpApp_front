import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import Client from "../../models/Client";
import Organization from "../../models/Organization";
interface IProps {
    handler?: any
    organizations: Organization[]
}
interface IState {
    isOpen: boolean
    client: Client
}

export default class CreateClient extends Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        let client = new Client();
        if (props.organizations[0])
            client.orgId = props.organizations[0].id
        this.state = {
            isOpen: false,
            client: client
        }
        this.toggle = this.toggle.bind(this);
    }

    render() {
        let options = []
        for (let org of this.props.organizations){
            options.push(<option key={org.id} value={org.id}>{org.name}</option>)
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
                    <ModalHeader>Новый Клиент</ModalHeader>
                    <Form onSubmit={this.onSubmitHandler.bind(this)}>
                        <ModalBody>
                            <FormGroup style={{"margin": "10px"}}>
                                <Label className="mr-sm-2">Название</Label>
                                <Input type="text"
                                       name="Name"
                                       placeholder="Введите название клиента"
                                       onChange={this.onChangeName.bind(this)}
                                />
                            </FormGroup>
                            <FormGroup style={{"margin": "10px", "width": "none"}}>
                                <Label className="mr-sm-2">Организация</Label>
                                <Input type="select" name="orgId" onChange={this.onChangeOrgId.bind(this)}>
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
        this.props.handler(this.state.client);
    }

    private onChangeName(event: any){
        event.preventDefault();
        let client= Object.assign(this.state.client);
        client.name = event.target.value
        this.setState({client: client});
    }

    private onChangeOrgId(event: any){
        event.preventDefault();
        let client= Object.assign(this.state.client);
        client.orgId = event.target.value
        this.setState({client: client});
    }
    public toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }
}
