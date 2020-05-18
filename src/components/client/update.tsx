import ClientModel from '../../models/Client'
import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import ClientService from "../../services/ClientService";

interface IProps {
    client: ClientModel,
    buttonLabel: string
    onOrgUpdate: any,
}

interface IState {
    isOpen: boolean
    client: ClientModel
}

export default class UpdateClient extends Component<IProps, IState> {
    private api: ClientService = new ClientService()

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            client: props.client
        }
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }

    public toggle(): void {
        this.setState({isOpen: true})
    }

    public async update(): Promise<void> {
        await this.api.put(this.state.client);
    }

    public onChange(event: any): void {
        let client = Object.assign(this.props.client)
        client.name = event.target.value
        this.setState({client: client})
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
                                <Label for={this.props.client.id} className="mr-sm-2">Name</Label>
                                <Input type="text"
                                       name="Name"
                                       id={this.props.client.id}
                                       defaultValue={this.props.client.name}
                                       onChange={this.onChange}/>
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
