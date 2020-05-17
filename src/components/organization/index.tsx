import React from "react";
import OrganizationModel from '../../models/Organization'
import {Container, Spinner} from "reactstrap";
import Organization from "./show";
import "./index.scss"
import OrganizationService from "../../services/OrganizationService";

interface IState {
    isEmpty: boolean
    organizations: OrganizationModel[]
}
export default class OrganizationsList extends React.Component<any, IState> {
    private api: OrganizationService = new OrganizationService()

    constructor(props: any) {
        super(props);
        this.state = {
            isEmpty: true,
            organizations: []
        }
        this.api.get().then( organizations => this.setState({isEmpty: false, organizations: organizations}))
    }

    render() {
        return (
            <Container>
                {this.state.isEmpty ?
                    <Spinner color="primary" className="spinner"/>
                    : this.renderOrganization()}
            </Container>
        )
    }

    public deleteHandle(id: string){
        this.api.delete(id).then(data => {
            let delIndex = this.state.organizations.findIndex(org => org.id === data);
            let newOrgs = this.state.organizations.slice();
            newOrgs.splice(delIndex,1 )
            this.setState({organizations: newOrgs})
        })
    }

    private renderOrganization(): JSX.Element[] {
        return this.state.organizations.slice().map(org => <Organization
            organization={org}
            key={org.id}
            onDelete={this.deleteHandle.bind(this)}
        />)
    }
}
