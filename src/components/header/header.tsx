import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem} from 'reactstrap';
import {Link} from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Sup Service</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/organizations">Организации</Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }

}

export default Header
