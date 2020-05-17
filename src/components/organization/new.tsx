import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import Organization from "../../models/Organization";
interface IProps {
    handler?: any
}
interface IState {
    isOpen: boolean
    organization: Organization
}

export default class CreateOrganization extends Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false,
            organization: new Organization()
        }
        this.toggle = this.toggle.bind(this);
    }


    render() {
       return (
           <div>
               <Row id="new"
                    className="organization"
                    onClick={this.toggle}>
                   <img src="https://img.icons8.com/android/24/000000/plus.png" alt="Добавить Организацию"/>
               </Row>
               <Modal isOpen={this.state.isOpen}
                      toggle={this.toggle}>
                   <ModalHeader>Новая Организация</ModalHeader>
                   <Form inline onSubmit={this.onSubmitHandler.bind(this)}>
                       <ModalBody>
                           <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                               <Label className="mr-sm-2">Название</Label>
                               <Input type="text"
                                      name="Name"
                                      placeholder="Введите название организации"
                                      onChange={this.onChange.bind(this)}/>
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
        this.props.handler(this.state.organization);
    }

    private onChange(event: any){
        let organization = new Organization();
        organization.name = event.target.value
        this.setState({organization: organization});
    }
    public toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }
}
