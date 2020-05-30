import React from "react";
import OrganizationModel from '../../models/Organization'
import {Button, Container, Input, InputGroup, InputGroupAddon, Spinner} from "reactstrap";
import Organization from "./show";
import "./index.scss"
import OrganizationService from "../../services/OrganizationService";
import CreateOrganization from "./new";

interface IState {
    search: string
    isEmpty: boolean
    organizations: OrganizationModel[]
}
export default class OrganizationsList extends React.Component<any, IState> {
    private api: OrganizationService = new OrganizationService()

    constructor(props: any) {
        super(props);
        this.state = {
            search: '',
            isEmpty: true,
            organizations: []
        }
        this.api.get().then( organizations => this.setState({isEmpty: false, organizations: organizations}))
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><Button onClick={this.search.bind(this)}>Поиск</Button></InputGroupAddon>
                    <Input onChange={this.changeHandle.bind(this)}
                           value={this.state.search}
                           onKeyPress={this.enterHandler.bind(this)}
                           placeholder="Введите что нибуть"
                    />
                </InputGroup>
                <Container>
                    {this.state.isEmpty ?
                        <Spinner color="primary" className="spinner"/>
                        : this.renderOrganization()}
                </Container>
            </div>
        )
    }

    public createHandle(model: OrganizationModel){
        this.api.post(model).then(org => {
            let organizations = this.state.organizations.slice();
            organizations.push(org);
            this.setState({organizations: organizations})
        })
    }

    public deleteHandle(id: string){
        this.api.delete(id).then(data => {
            let delIndex = this.state.organizations.findIndex(org => org.id === data);
            let newOrgs = this.state.organizations.slice();
            newOrgs.splice(delIndex,1 )
            this.setState({organizations: newOrgs})
        })
    }

    private changeHandle(event: any){
        this.setState({search: event.target.value});
    }

    private enterHandler(event: any){
        if (event.key === 'Enter'){
            this.search();
        }
    }

    private search(){
        this.api.search(this.state.search).then( organizations => this.setState({organizations}))
    }

    private renderOrganization(): JSX.Element[] {
        let appendElement = <CreateOrganization key="new" handler={this.createHandle.bind(this)}/>
        let elements = this.state.organizations.slice().map(org => <Organization
            organization={org}
            key={org.id}
            onDelete={this.deleteHandle.bind(this)}
        />)
        elements = [...elements, appendElement];
        return elements;
    }
}
