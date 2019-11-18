import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, Button, NavDropdown, Form, FormControl} from 'react-bootstrap';
import React, {Component} from 'react';
import FileUpload from './FileUpload'

export default class SidebarLayout extends Component {

    constructor(props) {
        super(props);

        this.state = {
          isVisible: false,
        };
    }

    updateModal(isVisible) {
    	this.state.isVisible = isVisible;
      this.forceUpdate();
    }

    render() {
        return (
            <div className="container" style={{position:"relative"}}>
                 <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Config" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/edit">Edit</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Save to Cookies</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Save to file</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                        <Form inline>
                            <FileUpload onDataCompleted={this.props.onDataCompleted} />
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
              </div>
        );
    }
}