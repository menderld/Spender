import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, Button, NavDropdown, Form, FormControl} from 'react-bootstrap';
import React, {Component} from 'react';
import FileUpload from './FileUpload'
import {saveToLocalStorage} from '../Helpers/helper'
import {store} from '../config';
import {Link} from "react-router-dom";

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
                        <Link to="/">Home</Link>
                        <NavDropdown title="Config" id="basic-nav-dropdown">
                                <Link to="/edit">Edit</Link>

                            <NavDropdown.Item href="#action/3.2" onClick={()=> saveToLocalStorage(store.getState().priceConfig.getMapping())}>Save to Local Storage</NavDropdown.Item>
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