import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {Modal, Button} from 'react-bootstrap';


export default class SaveFileModalComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            wait: 500,
            internalShow: true
        }
    }

    hide(){
        this.setState({internalShow:false})
        this.props.onHide()
    }

    render(){
        return (
            <div>
                <Modal  dialogClassName={{"background-color":"red"}} show={this.state.internalShow} keyboard={true} onClick={()=> console.log("click")} onHide={() => this.hide()}>
                    <Modal.Body >{this.props.message}</Modal.Body>
                </Modal>
            </div>
        )
    }
}