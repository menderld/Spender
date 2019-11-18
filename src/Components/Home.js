import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import SpendingPieChart from './SpendingPieChart'

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trans : [],
            on : false,
            isOpen: false
        }

    }

    render(){
        return (
                <SpendingPieChart transactions={this.props.trans} priceConfig={this.props.priceConfig}/>
            );
    }
}


