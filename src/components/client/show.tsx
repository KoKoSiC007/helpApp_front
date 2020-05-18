import React, {Component} from 'react'
import ClientModel from "../../models/Client";
import {Row} from "reactstrap";
import UpdateClient from "./update";

interface IProps {
    client: ClientModel;
    onDelete: any
}
interface IState {
    isOpen: boolean
    client: ClientModel
}
export default class Client extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            client: this.props.client
        }
        this.updateClient = this.updateClient.bind(this);
        this.delete = this.delete.bind(this);
    }

    private hiddenView: JSX.Element =
        <Row id={this.props.client.id}
             onClick={this.showView.bind(this)}
             className="trow">
            {this.props.client.name}
        </Row>
    private openView : JSX.Element =
        <div onClick={this.showView.bind(this)}
             className="trow row">
            <div className="col-8" id={this.props.client.id}>
                ID: {this.props.client.id}<br/>
                Name: {this.props.client.name}
            </div>
            <div className="col-4 trow__buttons">
                <UpdateClient client={this.props.client} onOrgUpdate={this.updateClient} buttonLabel="Update"/>
                <button onClick={this.delete.bind(this)} className="btn btn-danger">Delete</button>
            </div>
        </div>

    render() {
        if (this.state.isOpen) return  this.openView
        else return this.hiddenView;
    }

    public updateClient(client: ClientModel){
        this.setState({client: client})
    }

    public delete(): void {
        this.props.onDelete(this.props.client.id);
    }

    public showView(event: any): void{
        if (event?.nativeEvent?.target?.id === this.props.client.id)
            this.setState({isOpen: !this.state.isOpen})
    }
}
