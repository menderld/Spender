import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, Button, NavDropdown, Form, FormControl} from 'react-bootstrap';
import React, {Component} from 'react';
import FileUpload from './FileUpload'
import {saveMappingFactoryToLocalStorage} from '../Helpers/helper'
import * as comandante from '../config';
import { withRouter } from 'react-router'

class SidebarLayout extends Component {

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
        const history = this.props.history;
        return (
            <div className="container" style={{position:"relative"}}>
                 <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Spender</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link onClick={()=> history.push("/")}>Home</Nav.Link>
                        <NavDropdown title="Config" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=> history.push("/edit")}>Edit</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=> saveMappingFactoryToLocalStorage(comandante.getFactory())}>Save to Local Storage</NavDropdown.Item>
                            <NavDropdown.Item >Save to file</NavDropdown.Item>
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

export default withRouter(SidebarLayout)