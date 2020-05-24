import React, {Component} from 'react'
import MessageModel from "../../models/Message";
import {Row} from "reactstrap";

interface IProps {
    message: MessageModel;
    onDelete: any
}
interface IState {
    isOpen: boolean
    message: MessageModel
}
export default class Client extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            message: this.props.message
        }
        this.updateClient = this.updateClient.bind(this);
        this.delete = this.delete.bind(this);
    }

    private hiddenView: JSX.Element =
        <Row id={this.props.message.id}
             onClick={this.showView.bind(this)}
             className="trow">
            {this.props.message.text}
        </Row>
    private openView : JSX.Element =
        <div onClick={this.showView.bind(this)}
             className="trow row">
            <div className="col-8" id={this.props.message.id}>
                ID: {this.props.message.id}<br/>
                Name: {this.props.message.text}
            </div>
            <div className="col-4 trow__buttons">
                <button onClick={this.delete.bind(this)} className="btn btn-danger">Delete</button>
            </div>
        </div>

    render() {
        if (this.state.isOpen) return  this.openView
        else return this.hiddenView;
    }

    public updateClient(message: MessageModel){
        this.setState({message: message})
    }

    public delete(): void {
        this.props.onDelete(this.props.message.id);
    }

    public showView(event: any): void{
        if (event?.nativeEvent?.target?.id === this.props.message.id)
            this.setState({isOpen: !this.state.isOpen})
    }
}
