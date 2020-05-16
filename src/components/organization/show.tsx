import OrganizationModel from '../../models/Organization'
import "./show.scss"
import UpdateOrganization from "./update";
import React, {Component} from "react";
import {Row} from "reactstrap";

interface IProps {
    organization: OrganizationModel;
}

interface IState {
    isOpen: boolean
    organization: OrganizationModel
}

export default class Organization extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            organization: this.props.organization
        }
    }
    private hiddenView: JSX.Element =
        <Row id={this.props.organization.id}
             onClick={this.showView.bind(this)}
             className="organization">
            {this.props.organization.name}
        </Row>
    private openView : JSX.Element =
        <div onClick={this.showView.bind(this)}
            className="organization row">
            <div className="col-8" id={this.props.organization.id}>
                ID: {this.props.organization.id}<br/>
                Name: {this.props.organization.name}
            </div>
            <div className="col-4 organization__buttons">
                <UpdateOrganization organization={this.props.organization} onOrgUpdate={this.updateOrganization.bind(this)} buttonLabel="Update"/>
                <button onClick={this.delete.bind(this)} className="btn btn-danger">Delete</button>
            </div>
        </div>

    render() {
       if (this.state.isOpen){
           return this.openView;
       }else{
           return  this.hiddenView;
       }
    }

    public updateOrganization(organization: OrganizationModel){
        this.setState({organization: organization})
    }
    public showView(event: any): void{
        if (event?.nativeEvent?.target?.id === this.state.organization.id)
            this.setState({isOpen: !this.state.isOpen})
    }
    public delete(): void{
        console.warn(23)
    }
}
