import React, {Component} from 'react';
import UserService from "../../services/UserService";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import './index.scss'

interface IProps {
    onLoginHandler: any
}

interface IState {
    logIn: boolean,
    manager: {email: string|null, password: string|null}
}
export default class Root extends Component<IProps, IState>{
    private userService = new UserService()
    constructor(props: IProps) {
        super(props);
        this.state = {
            logIn: !!localStorage.getItem('token'),
            manager: {email:null, password: null}
        }
    }
    private loginForm = <Form className="login">
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="email" className="mr-sm-2">Email</Label>
            <Input type="email"
                   name="email"
                   id="email"
                   placeholder="something@idk.cool"
                   onChange={this.emailChangeHandler.bind(this)}
            />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassword" className="mr-sm-2">Password</Label>
            <Input type="password"
                   name="password"
                   id="password"
                   onChange={this.passChangeHandler.bind(this)}
            />
        </FormGroup>
        <FormGroup>
            <Button onClick={this.onSubmitHandle.bind(this)}>Войти</Button>
        </FormGroup>
    </Form>;
    private page = <h1>Hello</h1>;

    render() {
        if (this.state.logIn)
            return this.page;
        else
            return this.loginForm;
    }

    private emailChangeHandler(event: any): void {
        let manager = Object.assign(this.state.manager)
        manager.email = event.target.value
        this.setState({manager: manager})
    }
    private passChangeHandler(event: any): void {
        let manager = Object.assign(this.state.manager)
        manager.password = event.target.value
        this.setState({manager: manager})
    }
    private onSubmitHandle(): void {
        this.userService.logIn(this.state.manager).then( _ => {
            this.setState({logIn: true})
            this.props.onLoginHandler(true);
        } );
    }
}
