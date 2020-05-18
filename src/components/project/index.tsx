import React, {Component} from "react";
import {Container, Spinner} from "reactstrap";
import ProjectService from "../../services/ProjectService";
import ProjectModel from "../../models/Project";
import Client from "../../models/Client";
import ClientService from "../../services/ClientService";
import Project from "./show";
import CreateProject from "./new";
interface IState {
    isEmpty: boolean,
    projects: ProjectModel[],
    clients: Client[]
}
export default class ProjectList extends Component<any, IState>{
    private projectService: ProjectService = new ProjectService();
    private clientService: ClientService = new ClientService();

    constructor(props: any) {
        super(props);
        this.state = {
            isEmpty: true,
            projects: [],
            clients: []
        }
        this.projectService.get().then(projects => this.setState({projects: projects, isEmpty: false}));
        this.clientService.get().then(clients => this.setState({clients: clients}));
    }

    render() {
        return (
            <Container>
                {this.state.isEmpty ?
                    <Spinner color="primary" className="spinner"/>
                    : this.renderProjects()}
            </Container>
        );
    }

    public createHandle(model: ProjectModel){
        this.projectService.post(model).then(project => {
            let projects = this.state.projects.slice();
            if (project) {
                projects.push(project);
            }
            this.setState({projects: projects})
        })
    }
    public deleteHandle(id: string){
        this.projectService.delete(id).then(data => {
            let delIndex = this.state.projects.findIndex(project => project.id === data);
            let newProjects = this.state.projects.slice();
            newProjects.splice(delIndex,1 )
            this.setState({projects: newProjects})
        })
    }
    private renderProjects(): JSX.Element[] {
        let appendElement = <CreateProject key="new" clients={this.state.clients} handler={this.createHandle.bind(this)}/>
        let elements = this.state.projects.slice().map(project => <Project onDelete={this.deleteHandle.bind(this)} project={project} key={project.id}/>)
        return [...elements, appendElement]
    }
}
