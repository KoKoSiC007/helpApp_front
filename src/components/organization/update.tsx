import OrganizationModel from '../../models/Organization'
import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import OrganizationService from "../../services/OrganizationService";
interface IProps {
    organization: OrganizationModel,
    buttonLabel: string
    onOrgUpdate: any,
}

interface IState {
    isOpen: boolean
    organization: OrganizationModel
}

export default class UpdateOrganization extends Component<IProps, IState> {
    private api: OrganizationService = new OrganizationService()
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            organization: props.organization
        }
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }

    public toggle(): void {
        this.setState({isOpen: true})
    }

    public async update():Promise<void> {
        await this.api.put(this.state.organization);
    }

    public onChange(event: any): void {
        let organization = Object.assign(this.props.organization)
        organization.name = event.target.value
        this.setState({organization: organization})
    }

    render() {
        return (<div>
            <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            <Modal isOpen={this.state.isOpen}
                   toggle={this.toggle}>
                <ModalHeader>Update Organization</ModalHeader>
                <Form inline onSubmit={this.update}>
                    <ModalBody>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for={this.props.organization.id} className="mr-sm-2">Name</Label>
                                <Input type="text"
                                       name="Name"
                                       id={this.props.organization.id}
                                       defaultValue={this.props.organization.name}
                                       onChange={this.onChange}/>
                            </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Update</Button>
                        <Button color="secondary">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>);
    }
}
