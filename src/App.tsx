import React from 'react';
import './App.css';
import {Header, OrganizationsList} from "./components";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import ClientList from "./components/client";
import ProjectList from "./components/project";
import Root from "./components/root";
import TicketList from "./components/ticket";
import MessageList from "./components/message";

class App extends React.Component<any, { logIn: boolean} > {
    constructor(props: any) {
        super(props);
        this.state = {
            logIn: !!localStorage.getItem('token')
        }
    }
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header login={this.state.logIn} onLoginHandler={this.loginHandler.bind(this)}/>
                    <div id="main">
                        <Switch>
                            <Route exact path="/">
                                <Root onLoginHandler={this.loginHandler.bind(this)}/>
                            </Route>
                            <Route path="/organizations">
                                <OrganizationsList/>
                            </Route>
                            <Route path="/clients">
                                <ClientList/>
                            </Route>
                            <Route path="/projects">
                                <ProjectList/>
                            </Route>
                            <Route path="/tickets">
                                <TicketList/>
                            </Route>
                            <Route path="/messages">
                                <MessageList/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }

    public loginHandler(status: boolean):void {
        this.setState({logIn: status})
    }
}

export default App;
