import React, {Component} from 'react'
import {Row} from "reactstrap";
import UpdateProject from "./update";
import ProjectModel from "../../models/Project";

interface IProps {
    project: ProjectModel;
    onDelete: any
}
interface IState {
    isOpen: boolean
    project: ProjectModel
}
export default class Project extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
            project: this.props.project
        }
        this.updateProject = this.updateProject.bind(this);
        this.delete = this.delete.bind(this);
    }

    private hiddenView: JSX.Element =
        <Row id={this.props.project.id}
             onClick={this.showView.bind(this)}
             className="trow">
            {this.props.project.name}
        </Row>
    private openView : JSX.Element =
        <div onClick={this.showView.bind(this)}
             className="trow row">
            <div className="col-8" id={this.props.project.id}>
                ID: {this.props.project.id}<br/>
                Name: {this.props.project.name}
            </div>
            <div className="col-4 trow__buttons">
                <UpdateProject project={this.props.project} onUpdate={this.updateProject} buttonLabel="Update"/>
                <button onClick={this.delete.bind(this)} className="btn btn-danger">Delete</button>
            </div>
        </div>

    render() {
        if (this.state.isOpen) return  this.openView
        else return this.hiddenView;
    }

    public updateProject(project: ProjectModel){
        this.setState({project: project})
    }

    public delete(): void {
        this.props.onDelete(this.props.project.id);
    }

    public showView(event: any): void{
        if (event?.nativeEvent?.target?.id === this.props.project.id)
            this.setState({isOpen: !this.state.isOpen})
    }
}
