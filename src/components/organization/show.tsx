import OrganizationModel from '../../models/Organization'
import "./show.scss"
import UpdateOrganization from "./update";
import React, {Component} from "react";
import {Row} from "reactstrap";

interface IProps {
    organization: OrganizationModel;
    onDelete: any;
}

interface IState {
    isOpen: boolean;
    organization: OrganizationModel;
}

export default class Organization extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            organization: this.props.organization
        }
        this.updateOrganization = this.updateOrganization.bind(this);
    }
    private hiddenView: JSX.Element =
        <Row id={this.props.organization.id}
             onClick={this.showView.bind(this)}
             className="trow">
            {this.props.organization.name}
        </Row>
    private openView : JSX.Element =
        <div onClick={this.showView.bind(this)}
            className="trow row">
            <div className="col-8" id={this.props.organization.id}>
                ID: {this.props.organization.id}<br/>
                Name: {this.props.organization.name}
            </div>
            <div className="col-4 trow__buttons">
                <UpdateOrganization organization={this.props.organization} onOrgUpdate={this.updateOrganization} buttonLabel="Update"/>
                <button onClick={this.delete.bind(this)} className="btn btn-danger">Delete</button>
            </div>
        </div>

    render() {
       if (this.state.isOpen){
           return this.openView;
       }else{
           return this.hiddenView;
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
        this.props.onDelete(this.props.organization.id)
    }
}
