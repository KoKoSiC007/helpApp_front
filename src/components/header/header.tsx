import React from 'react';
import {Button, Nav, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";

interface IProps {
    onLoginHandler: any,
    login: boolean
}

class Header extends React.Component<IProps, any> {

    render() {
        const bar = <Nav className="mr-auto" navbar>
            <NavItem>
                <Link className="nav-link" to="/organizations">Организации</Link>
            </NavItem>
            <NavItem>
                <Link className="nav-link" to="/clients">Клиенты</Link>
            </NavItem>
            <NavItem>
                <Link className="nav-link" to="/projects">Проекты</Link>
            </NavItem>
            <NavItem>
                <Link className="nav-link" to="/tickets">Тикеты</Link>
            </NavItem>
            <NavItem>
                <Button className="nav-link" onClick={this.logOut.bind(this)}>Выйти</Button>
            </NavItem>
        </Nav>

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Sup Service</NavbarBrand>
                    {this.props.login ? bar : null}
                </Navbar>
            </div>
        );
    }

    private logOut():void{
        const userService = new UserService();
        userService.logOut();
        this.props.onLoginHandler(false)
        window.location.href = '/'
    }
}


export default Header
