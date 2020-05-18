import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Project from "../../models/Project";
import ProjectService from "../../services/ProjectService";

interface IProps {
    project: Project,
    buttonLabel: string,
    onUpdate: any
}

interface IState {
    isOpen: boolean
    project: Project
}

export default class UpdateProject extends Component<IProps, IState> {
    private api: ProjectService = new ProjectService()

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            project: props.project
        }
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.update = this.update.bind(this);
    }

    public toggle(): void {
        this.setState({isOpen: true})
    }

    public async update(): Promise<void> {
        await this.api.put(this.state.project);
    }

    public onChange(event: any): void {
        let project = Object.assign(this.props.project)
        project.name = event.target.value
        this.setState({project: project})
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
                                <Label for={this.props.project.id} className="mr-sm-2">Name</Label>
                                <Input type="text"
                                       name="Name"
                                       id={this.props.project.id}
                                       defaultValue={this.props.project.name}
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
